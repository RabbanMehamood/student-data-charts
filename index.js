let studentsData = [];
let counter = 0;
let studentTable = document.querySelector("tbody");
console.log(studentTable);

// canvas code start
const ctx = document.getElementById("studentPlot").getContext("2d");
let myChart;

window.updateChart = function (index, chartType) {
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
    type: chartType,
    data: {
      labels: labels,
      datasets: [
        {
          label: student.studentname,
          data: values,
          backgroundColor: [
            "rgb(255, 99, 133)",
            "rgb(54, 163, 235)",
            "rgb(255, 207, 86)",
            "rgb(75, 192, 192)",
            "rgb(153, 102, 255)",
            "rgb(255, 160, 64)",
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
};

window.removeStudent = function (index) {
  studentsData.splice(index, 1);
  renderStudentData();
  if (myChart) {
    myChart.destroy();
  }
};
// html code

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
           <select name="graphs" id="selectGraph" onchange="updateChart(${i},this.value)">
                            <option value="bar">Vertical Bar Graph</option>
                            <option value="horizontalBar">Horizontal Bar Graph</option>               
                            <option value="pie">Pie Chart</option>
                            <option value="doughnut">Doughnut Chart</option>
                        </select>
                        <button onclick="removeStudent(${i})">Remove Student</button>
            </td>
            
        `;
    studentTable.appendChild(row);
  }
}
