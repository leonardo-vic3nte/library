/* Selectors */
const cardsContainer = document.querySelector(".cards-container");
const bookForm = document.querySelector("#add-book-form");
const errorMsg = document.querySelector(".error");

const library = [];

function isInLibrary(bookToAdd) {
	return library.some(
		(bookInLibrary) => bookInLibrary.title === bookToAdd.title
	);
}

function Book(title, author, nrPages, isRead) {
	this.title = title;
	this.author = author;
	this.nrPages = nrPages;
	this.isRead = isRead;
}

function displayBook(book) {
	cardsContainer.appendChild(book);
}

function createBookHTML(book) {
	const container = document.createElement("div");
	container.classList.add("card");

	const cardTitle = document.createElement("h2");
	cardTitle.textContent = "Title";
	const title = document.createElement("p");
	title.textContent = book.title;
	container.appendChild(cardTitle);
	container.appendChild(title);

	const cardAuthor = document.createElement("h2");
	cardAuthor.textContent = "Author";
	const author = document.createElement("p");
	author.textContent = book.author;
	container.appendChild(cardAuthor);
	container.appendChild(author);

	const cardNrPages = document.createElement("h2");
	cardNrPages.textContent = "Pages";
	const nrPages = document.createElement("p");
	nrPages.textContent = book.nrPages;
	container.appendChild(cardNrPages);
	container.appendChild(nrPages);

	const readBtn = document.createElement("div");
	readBtn.classList.add("read");
	if (book.isRead === "true") {
		readBtn.textContent = "Read";
		readBtn.classList.add("true");
		readBtn.classList.remove("false");
	} else {
		readBtn.textContent = "Not Read";
		readBtn.classList.add("false");
		readBtn.classList.remove("true");
	}
	container.appendChild(readBtn);

	const removeBtn = document.createElement("div");
	removeBtn.classList.add("remove");
	removeBtn.textContent = "Remove";
	container.appendChild(removeBtn);

	return container;
}

function createBookObject(event) {
	event.preventDefault();

	const formData = new FormData(event.target);
	const formDataObj = Object.fromEntries(formData.entries());

	const newBook = new Book(
		formDataObj.title,
		formDataObj.author,
		formDataObj.nrPages,
		formDataObj.isRead
	);

	if (isInLibrary(newBook)) {
		errorMsg.classList.add("true");
		return;
	} else {
		errorMsg.classList.remove("true");
	}

	library.push(newBook);
	displayBook(createBookHTML(newBook));
}

bookForm.addEventListener("submit", createBookObject);
