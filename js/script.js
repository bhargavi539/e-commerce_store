
filterSelection("all")

var btns = document.getElementsByClassName("button");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

function filterSelection(c) {
  var x, i;
  var searchTerm = document.getElementById('search-box').value;
  searchTerm = searchTerm.toLowerCase();
  var allBookTitles =	document.getElementsByClassName('book-title');
  var bookTitlesArray = Array.from(allBookTitles);
	
  x = document.getElementsByClassName("all");
  for (i = 0; i < x.length; i++) {
  	var title = bookTitlesArray[i].textContent;
    x[i].classList.remove("show");
    if (x[i].className.indexOf(c) > -1 && title.toLowerCase().indexOf(searchTerm) > -1){
    	x[i].classList.add("show");
    }
  }
}

function searchBook(){
	var activeClass = document.getElementsByClassName('active')[0].innerText.toLowerCase();
	var searchTerm = document.getElementById('search-box').value;
	searchTerm = searchTerm.toLowerCase();
	var allBookTitles =	document.getElementsByClassName('book-title');
	var bookTitlesArray = Array.from(allBookTitles);
	
  	var x, i;
  	x = document.getElementsByClassName("all");
  	for (i = 0; i < x.length; i++) {
  		var title = bookTitlesArray[i].textContent;
    	x[i].classList.remove("show");
    	if (x[i].className.indexOf(activeClass) > -1 && title.toLowerCase().indexOf(searchTerm) > -1){
    		x[i].classList.add("show");
    	}
  	}

}//searchBook


function addToCart(){
	var cartCount = document.getElementById('cart-counter').innerHTML;
	cartCount++;
	document.getElementById('cart-counter').innerHTML = cartCount;
	addItemToCart(event);
}

function addItemToCart(event){
	var cartclick = event.target;
	var bookDetails = cartclick.parentElement.parentElement.parentElement.parentElement;
	var bookTitle = bookDetails.getElementsByClassName('book-title')[0].innerText;
	var bookPrice = bookDetails.getElementsByClassName('book-price')[0].innerText;
	var bookImage = bookDetails.getElementsByClassName('book-image')[0].src;
	var cartCount = document.getElementById('cart-counter').innerHTML;

	if(cartCount > 1){
		var itemNamesInCartObj = document.getElementsByClassName('cart-item-name');
		var itemQtyInCartObj = document.getElementsByClassName('qtyclass');

		var itemNamesInCart = [];
		for(p=0;p<itemNamesInCartObj.length;p++){
			itemNamesInCart.push(itemNamesInCartObj[p].innerText);
		}

		var itemQtyInCart = [];
		for(p=0;p<itemQtyInCartObj.length;p++){
			itemQtyInCart.push(itemQtyInCartObj[p].value);
		}
		
		if(itemNamesInCart.includes(bookTitle)){
			var i = itemNamesInCart.indexOf(bookTitle);
			var prevQty = itemQtyInCart[i];
			console.log(i);
			console.log(prevQty);

			inputChangedDuplicateAddition(prevQty,bookTitle);
			//console.log('1');
		}
		else{
			addItemToCartRow(bookImage,bookTitle,bookPrice);
			//console.log('2');
		}
	}
	else{
		addItemToCartRow(bookImage,bookTitle,bookPrice);
		//console.log('3');
	}
}
function addItemToCartRow(bookImage,bookTitle,bookPrice){
				
		var table = document.getElementsByClassName('table')[0];
		var tableData = table.getElementsByTagName('tbody')[0];
		var row = tableData.insertRow(-1);

		var itemImg =row.insertCell(0);

		var itemName=row.insertCell(1);
		console.log(itemName+"Item Name");
		var itemQty = row.insertCell(2);
		var itemPrice = row.insertCell(3);
		var removeButton = row.insertCell(4);


		itemImg.innerHTML = `<img src="${bookImage}" width="70" height="70">`;
		itemName.innerHTML = bookTitle;
		itemName.classList.add('cart-item-name');
		itemQty.innerHTML = `<input type='number' value='1' name='quantity' id="qty" class="qtyclass" style="width: 40px">`;
		itemPrice.innerHTML = bookPrice;
		itemPrice.classList.add('cart-item-price');
		removeButton.innerHTML = 
		`<button class="btn-warning delete" onclick= "deleteClicked(event);">Delete</button>`;

		
		//Updating cart total value
		var cartItemPrice = document.getElementsByClassName('cart-item-price');
		var cartTotal=0;
		for(j=0;j<cartItemPrice.length;j++){
			var ItemPrice = cartItemPrice[j].innerText.replace('$','');
			//console.log(cartTotal);
			cartTotal =parseFloat(cartTotal) + parseFloat(ItemPrice);
			}
			cartTotal = cartTotal.toFixed(1);
			//console.log(cartTotal);
		document.getElementById('cart-total').innerText = "$"+cartTotal;

		var allqty = document.getElementsByClassName('qtyclass');
		for(i=0;i<allqty.length;i++){
			allqty[i].addEventListener('change',inputChanged);
		}
}

function inputChanged(event){

	var qtyChanged = event.target;
	if(isNaN(qtyChanged.value) || qtyChanged.value <= 0 || qtyChanged.value % 1 != 0){
		alert("Invalid entry. Please enter positive integers. Quantity reset to 1.")
		qtyChanged.value = 1;
		console.log(qtyChanged.value);
	}
	
	updateCartValue(); 
}

function deleteClicked(event){
	var deleteButton = event.target;
	var test = deleteButton.parentElement.parentElement;
	// console.log(test);
	test.remove();
	var cartCount = document.getElementById('cart-counter').innerHTML;
	cartCount--;
	document.getElementById('cart-counter').innerHTML = cartCount;
	updateCartValue();
}

function inputChangedDuplicateAddition(prevQty,bookTitle){
	var tableRows = document.getElementById("item-row").rows.length;
	var newQty = parseInt(prevQty) + 1;
	for(r=0;r<tableRows;r++){
		if(document.getElementsByClassName('cart-item-name')[r].innerText == bookTitle){
			document.getElementsByClassName('qtyclass')[r].value = newQty;
		}
	}

	updateCartValue();
}
function updateCartValue(){
	// var changedQty =  document.getElementById('qty')[0].value;
	// console.log("quantity changed" + changedQty);

	var table = document.getElementById('item-row');
	var rows = table.getElementsByTagName('tr').length;
	//console.log('no .of rows'+ rows);

	var total = 0;
	var cartUpdatedTotal =0;

	for(var i=0; i < rows; i++){
		var updatedInput = table.getElementsByClassName('qtyclass')[i].value;
		var cartItemPrice = table.getElementsByClassName('cart-item-price')[i].innerText.replace('$','');
		//console.log("updated Input"+ updatedInput);
		total = parseInt(total)+ parseInt(updatedInput);
		//console.log("total"+total);


		//Multiplying item qty with the price and displaying as cart total value
		cartUpdatedTotal = cartUpdatedTotal + (updatedInput * parseFloat(cartItemPrice));
		//console.log('cart final updated value'+cartUpdatedTotal);
	}

	cartUpdatedTotal = cartUpdatedTotal.toFixed(1);
	document.getElementById('cart-total').innerText = '$'+cartUpdatedTotal;//updated cart total
	document.getElementById('cart-counter').innerText = total;//updated cart count

}//updateCartValue()
function purchaseClicked(){
	if(document.getElementById('cart-counter').innerText == 0){
		alert("Please add at least one item to cart before clicking on Purchase");
	}
	else{
			var condition =confirm("Please click OK to confirm the purchase or Cancel to continue shopping");
	if(condition == true){
		alert("Thank you for shopping with Gift A Book. Your purchase is now complete. We will process the order as soon as possible.");

		var cartTable = document.getElementById('item-row');
		var tableRows = cartTable.getElementsByTagName('tr');
		var cartRowCount = tableRows.length;
		//console.log('condition true')

		saveOrderToFile();

		for (var x=cartRowCount-1; x>=0; x--) {
   			cartTable.removeChild(tableRows[x]);
   			//console.log('cart table deleted');
		}

		//clearing the cart count after purchasing
		var cartCount = document.getElementById('cart-counter').innerText;
		cartCount = 0;
		document.getElementById('cart-counter').innerText = cartCount;

		//clearing cart total after purchasing
		var cartTotal = document.getElementById('cart-total').innerText;
		//console.log(cartTotal);
		cartTotal = parseFloat(0);
		document.getElementById('cart-total').innerText = "$" + cartTotal.toFixed(2);

	}

	else{
			//do nothing;
	}

	}
	
}//purchase clicked;

function saveOrderToFile(){

		var itemNamesInCartObj = document.getElementsByClassName('cart-item-name');
		var itemQtyInCartObj = document.getElementsByClassName('qtyclass');
		var priceInCartObj	= document.getElementsByClassName('cart-item-price');
		var jsonObj = {};

		for(p=0;p<itemNamesInCartObj.length;p++){
			bookTitle = itemNamesInCartObj[p].innerText;
			var qtyPriceJSON = {};
			qtyPriceJSON.quantity = itemQtyInCartObj[p].value;
			qtyPriceJSON.price = priceInCartObj[p].innerText;
			jsonObj[bookTitle] = qtyPriceJSON;
		}

		jsonOut = JSON.stringify(jsonObj);

		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var dateTime = date+'_'+time;

		download(jsonOut, 'order_' + dateTime + '.json', 'json');
		//download(jsonOut, 'filename.txt', 'text/plain');


}//saveOrderToFile

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}//download


function addToWish(event){
	var wishItem = event.target;
	var condition = wishItem.classList.contains('change-color');
	console.log(condition);
	if(condition){
		var wishCounter = document.getElementById('wish-counter').innerText;
		
		wishCounter--;
		document.getElementById('wish-counter').innerText = wishCounter;
	}else{
		var wishCounter = document.getElementById('wish-counter').innerText;
		
		wishCounter++;
		document.getElementById('wish-counter').innerText = wishCounter;
	}
}//addToWish

$(document).ready(function(){
	$('.fa-heart').click(function(){
		$(this).toggleClass('change-color');
	});
	$('.button1').click(function(){
		var filterizd = $('.wrapper').filterizr({});
	});
});