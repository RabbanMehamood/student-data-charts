let studentsData = [];
let counter = 0;
let studentTable = document.querySelector("tbody");
console.log(studentTable);

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  let studentNameValue = document
    .getElementById("studentName")
    .value.trim()
    .toUpperCase();
  let firstlang = document.getElementById("firstlang").value.trim();
  let secondlang = document.getElementById("secondlang").value.trim();
  let engilshValue = document.getElementById("engilshValue").value.trim();
  let mathsValue = document.getElementById("mathsValue").value.trim();
  let socialValue = document.getElementById("socialValue").value.trim();
  let physicsValue = document.getElementById("physicsValue").value.trim();

  //   if (checkStudentName(studentNameValue)) {
  //     alert("Student already Exist");
  //     return;
  //   }

  let newData = {
    id: (++counter).toString(),
    studentname: studentNameValue,
    firstlangmarks: firstlang,
    secondlangmarks: secondlang,
    englishmarks: engilshValue,
    mathsmarks: mathsValue,
    socialmarks: socialValue,
    physicsmarks: physicsValue,
  };

  document.getElementById("studentName").value = "";
  document.getElementById("firstlang").value = "";
  document.getElementById("secondlang").value = "";
  document.getElementById("engilshValue").value = "";
  document.getElementById("mathsValue").value = "";
  document.getElementById("socialValue").value = "";
  document.getElementById("physicsValue").value = "";

  console.log(newData);
  studentsData.push(newData);
  document.getElementById("stuAddPopup").style.display = "none";
  renderStudentData();
});

const addBtn = document.getElementById("addStudent");
addBtn.addEventListener("click", function () {
  document.getElementById("stuAddPopup").style.display = "block";
});

document.getElementById("closeAddBtn").addEventListener("click", function () {
  document.getElementById("stuAddPopup").style.display = "none";
});

function renderStudentData() {
  studentTable.innerHTML = "";

  // Display the records for the current page
  for (let i = 0; i < studentsData.length; i++) {
    const student = studentsData[i];
    const row = document.createElement("tr");
    row.setAttribute("id", `${i}`);
    row.innerHTML = `
             <td>${student.id}</td>
            <td>${student.studentname}</td>
            <td>${student.firstlangmarks}</td>
            <td>${student.secondlangmarks}</td>
            <td>${student.englishmarks}</td>
            <td>${student.mathsmarks}</td>
            <td>${student.socialmarks}</td>
            <td>${student.physicsmarks}</td>
            <td>
           <select name="graphs" id="graphs" onchange="updateChart(i)" >
<option value="bargraph">Horizontal Bar Graph</option>
<option value="verticalbar">Vertical Bar Graph</option>
<option value="pie">Pie Chart</option>
<option value="donut">Donut Chart</option>
</select>
<button>Remove Student </button>
            </td>
            
        `;
    studentTable.appendChild(row);
  }
}
// canvas code start
const ctx = document.getElementById("studentPlot").getContext("2d");
let myChart;

function updateChart(index) {
  const xValues = Object.keys(studentsData[index]);
  const yValues = Object.values(studentsData[index]);
  if (myChart) {
    myChart.destroy(); // Destroy the previous chart instance
  }
  myChart = new Chart(ctx, {
    type: "bar", // Change this to your desired chart type
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: data.label,
          data: data.values,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
