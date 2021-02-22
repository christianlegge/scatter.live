function toggleCollapse(category) {
	console.log(category);
	if (category.classList.contains("collapsed")) {
		category.classList.remove("collapsed");
		category.classList.add("expanded");
		for (let child of category.parentElement.children) {
			if (child.classList.contains("movie")) {
				child.classList.remove("hidden");
			}
		}
	}
	else {
		category.classList.remove("expanded");
		category.classList.add("collapsed");
		for (let child of category.parentElement.children) {
			if (child.classList.contains("movie")) {
				child.classList.add("hidden");
			}
		}
	}
}
