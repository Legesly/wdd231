const courseList = document.querySelector("#courses");
const creditTotal = document.querySelector("#credits");
const filterButtons = document.querySelectorAll(".filter-button");

function displayCourses(list) {
    courseList.innerHTML = "";

    list.forEach((course) => {
        const card = document.createElement("article");
        card.classList.add("course-card");
        if (course.completed) {
            card.classList.add("completed");
        }

        const code = document.createElement("h3");
        code.textContent = `${course.subject} ${course.number}`;

        const title = document.createElement("p");
        title.textContent = course.title;

        card.append(code, title);

        if (course.completed) {
            const badge = document.createElement("p");
            badge.classList.add("badge");
            badge.textContent = "Completed";
            card.append(badge);
        }

        courseList.append(card);
    });

    const credits = list.reduce((total, course) => total + course.credits, 0);
    creditTotal.textContent = `The total credits for courses listed above is ${credits}`;
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");

        const subject = button.dataset.subject;
        const visibleCourses = subject === "all"
            ? courses
            : courses.filter((course) => course.subject === subject);

        displayCourses(visibleCourses);
    });
});

displayCourses(courses);
