import Chart from "https://cdn.jsdelivr.net/npm/chart.js";
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
  //
  //
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
           <select name="graphs" id="graphs${i}" onchange="updateChart(${i})">
                            <option value="bargraph">Horizontal Bar Graph</option>
                            <option value="verticalbar">Vertical Bar Graph</option>
                            <option value="pie">Pie Chart</option>
                            <option value="donut">Donut Chart</option>
                        </select>
                        <button onclick="removeStudent(${i})">Remove Student</button>
            </td>
            
        `;
    studentTable.appendChild(row);
  }
}
// canvas code start
const ctx = document.getElementById("studentPlot").getContext("2d");
let myChart;

function updateChart(index) {
  const student = studentsData[index];
  const labels = [
    "First Language",
    "Second Language",
    "English",
    "Maths",
    "Social",
    "Physics",
  ];
  const values = [
    parseFloat(student.firstlangmarks),
    parseFloat(student.secondlangmarks),
    parseFloat(student.englishmarks),
    parseFloat(student.mathsmarks),
    parseFloat(student.socialmarks),
    parseFloat(student.physicsmarks),
  ];

  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: student.studentname,
          data: values,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
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

function removeStudent(index) {
  studentsData.splice(index, 1); // Remove the student from the array
  renderStudentData(); // Re-render the student data
  if (myChart) {
    myChart.destroy(); // Destroy the chart if it exists
  }
}
