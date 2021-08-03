class Book{
	constructor(title,author,isbn){
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

class UI{
	 addBook(book){
		const link = document.getElementById('book-list');
		const row = document.createElement('tr');
		row.innerHTML = `<td>${book.title}</td>
						 <td>${book.author}</td>
						 <td>${book.isbn}</td>
						 <td><a href="#" class="delete">Delete</a></td>`;
		link.appendChild(row);
	}
	clear(){
		const title = document.getElementById('title').value = '';
		const author = document.getElementById('author').value = '';
		const isbn = document.getElementById('isbn').value = '';
	}
	showAlert(message,className){
		const div = document.createElement('div');
		div.className=`alert ${className}`;
		div.appendChild(document.createTextNode(message));
		const container = document.querySelector(".container");
		const form = document.querySelector("#book-form");
		container.insertBefore(div,form);

		setTimeout(function(){
			document.querySelector('.alert').remove();},3000);
	}
	removeBook(target){
		if(target.className === 'delete'){
			target.parentElement.parentElement.remove();
		}
		
	}
}
class Storage{

	static getBook(){
	
		let books;
		if(localStorage.getItem('books') === null){
			books = [];
		}else{
			books = JSON.parse(localStorage.getItem('books'));
		}
		return books;
	}

	static displayBook(){
		const books = Storage.getBook();
		books.forEach(function(book){
			const ui = new UI();
			ui.addBook(book);
		})
	}

	static addBookToLS(book){
		const books = Storage.getBook();
		books.push(book);
		localStorage.setItem("books",JSON.stringify(books));
	}

	static deleteBookFromLS(isbn){

		const books = Storage.getBook();
		books.forEach(function(book,index){
			if(book.isbn === isbn){
			books.splice(index,1);
			}
		});
		localStorage.setItem('books',JSON.stringify(books));
		
	}


}

document.getElementById('book-form').addEventListener('submit',function(e){
	const title = document.getElementById('title').value,
		  author = document.getElementById('author').value,
		  isbn = document.getElementById('isbn').value 
	const book = new Book(title,author,isbn);
	const ui = new UI();
	if(title ===''||author === ''||isbn === ''){
		ui.showAlert('Please provide all the details','error');
	}else{

		ui.addBook(book);
		ui.showAlert('Book is added!','success');
		Storage.addBookToLS(book);
		ui.clear();
		
	}	
	e.preventDefault();
});

document.getElementById('book-list').addEventListener('click',function(e){
	const ui = new UI();
	ui.removeBook(e.target);
	ui.showAlert('Book is deleted!','success');
	Storage.deleteBookFromLS(e.target.parentElement.previousElementSibling.textContent);
	e.preventDefault();
});

document.addEventListener('DOMContentLoaded',Storage.displayBook);