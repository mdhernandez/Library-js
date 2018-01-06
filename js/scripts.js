/*
Author: Michael David Hernandez
Date: January 6th, 2018
First Iteration
*/

let myLibrary = [];

function Book(title, author, pages, read){
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	
	this.info = function(){
		let str = this.title + ", " + this.author + ", " + this.pages + ", " + this.read;
		return str;
	}
}

function addBookToLibrary(){
	let btn = document.querySelector('#btn');
	btn.addEventListener("click", () => {
		let pTitle = prompt("Title: ");
		let pAuthor = prompt("Author: ");
		let pPages = prompt("Pages: ");
		let pRead = prompt ("Read?", "Yes");
		
		if (pRead.toLowerCase() == "yes"){
			pRead = true
		}
		else{
			pRead = false;
		}
		
		let newBook = new Book(pTitle, pAuthor, pPages, pRead)
		myLibrary.push(newBook);
		render();
	});
}

function readSwitch(bRead, switcher, readStatus){
	if(readStatus){
	  bRead.textContent = "Read";
	  switcher.textContent = "Mark as Unread";
	  switcher.classList.add("readSwitcher");
	}
	
	else{
	  bRead.textContent = "Not Read";
	  switcher.textContent = "Mark as Read";
	  switcher.classList.add("unreadSwitcher");
	}
		
	switcher.addEventListener("click", function(){
	  if(switcher.classList.contains("readSwitcher")){
	    switcher.textContent = "Mark as Read";
	    switcher.classList.add("unreadSwitcher");
	    switcher.classList.remove("readSwitcher");
	    bRead.textContent = "Unread";
	  }
	  else{
		switcher.textContent = "Mark as Unread";
		switcher.classList.add("readSwitcher");
		switcher.classList.remove("unreadSwitcher");
		bRead.textContent = "Read";
	  }
	});
}

//Creates HTML Objects to represent books based on the Book Object Constructor above
function render(){
	let contain = document.querySelector('#library');
	contain.innerHTML = "";
	myLibrary.forEach(function(book, index){
		
		let card = document.createElement('div');
		
		let bTitle = document.createElement('p');
		bTitle.textContent = book.title;
		
		let bAuthor = document.createElement('p');
		bAuthor.textContent = book.author;
		
		let bPages = document.createElement('p');
		bPages.textContent = book.pages.toString();
		
		let bRead = document.createElement('p');
		let switcher = document.createElement('button');
		
		readSwitch(bRead, switcher, book.read);
		
		let remover = document.createElement('button');
		
		remover.textContent = "Remove";
		remover.classList.add ("remover");
		
		remover.addEventListener("click", function(){
			delete myLibrary[index];
			render();
		});
		
		card.appendChild(bTitle);
		card.appendChild(bAuthor);
		card.appendChild(bPages);
		card.appendChild(bRead);
		card.appendChild(switcher);
		card.appendChild(remover);
		card.classList.add("lib-card");
		contain.appendChild(card);
	});
}

function showHide(){
	let libBtn = document.querySelector('#lib-btn');
	
	libBtn.addEventListener("click", function(){
	  let mainer = document.querySelector("#library");
	  if (libBtn.className == "yes-lib"){
		  mainer.style.display = "none";
		  libBtn.classList.remove("yes-lib");
		  libBtn.classList.add("no-lib");
		  libBtn.textContent = "Show Library";
	  }	
	  else{
		  mainer.style.display = "block" //or whatever the display is
		  libBtn.classList.remove("no-lib");
		  libBtn.classList.add("yes-lib");
		  libBtn.textContent = "Hide Library";
	  }
	});
}

function mainWrapper(){
	showHide();
	addBookToLibrary();
	render();
}

mainWrapper();