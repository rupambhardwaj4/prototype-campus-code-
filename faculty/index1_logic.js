
document.addEventListener("DOMContentLoaded", function () {

    // --- Navigation Logic ---
    const navItems = document.querySelectorAll('.nav-item[data-target]');
    const sections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('page-title');

    // --- Sidebar Toggle Logic ---
    const sidebar = document.getElementById('mainSidebar');
    const toggleBtn = document.getElementById('sidebarToggleBtn');
    if (toggleBtn && sidebar) {
        const toggleIcon = toggleBtn.querySelector('i');
        const sidebarLogoText = document.getElementById('sidebarLogoText');
        const headerLogoText = document.getElementById('headerLogoText');

        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            if (sidebar.classList.contains('w-64')) {
                sidebar.classList.replace('w-64', 'w-20');
                if (toggleIcon) toggleIcon.style.transform = 'rotate(180deg)';
                if (sidebarLogoText) {
                    sidebarLogoText.style.opacity = '0';
                    sidebarLogoText.style.width = '0px';
                }
                if (headerLogoText) {
                    headerLogoText.classList.remove('hidden');
                    setTimeout(() => headerLogoText.classList.remove('opacity-0', '-translate-x-2'), 50);
                }
            } else {
                sidebar.classList.replace('w-20', 'w-64');
                if (toggleIcon) toggleIcon.style.transform = 'rotate(0deg)';
                if (sidebarLogoText) {
                    sidebarLogoText.style.opacity = '1';
                    sidebarLogoText.style.width = 'auto';
                }
                if (headerLogoText) {
                    headerLogoText.classList.add('opacity-0', '-translate-x-2');
                    setTimeout(() => headerLogoText.classList.add('hidden'), 300);
                }
            }
        });
    }

    function showSection(targetId) {
        sections.forEach(sec => sec.classList.add('hidden'));
        const targetSec = document.getElementById(targetId);
        if (targetSec) targetSec.classList.remove('hidden');

        navItems.forEach(item => {
            if (item.dataset.target === targetId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        if (pageTitle) {
            const titleMap = {
                'section-dashboard': 'Dashboard',
                'section-manage-problems': 'Manage Problems',
                'section-manage-contests': 'Manage Contests',
                'section-forum': 'Community Forum',
                'section-manage-class': 'Class Management',
                'section-tasks': 'Task Management',
                'section-settings': 'Settings',
                'section-support': 'Help & Support',
                'section-reports': 'Custom Reports'
            };
            pageTitle.textContent = titleMap[targetId] || 'Dashboard';
        }
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.dataset.target;
            if (target) showSection(target);
        });
    });

    // --- Theme Toggle ---
    const themeBtn = document.getElementById('themeToggleBtn');
    const themeIcon = themeBtn ? themeBtn.querySelector('i') : null;
    const html = document.documentElement;

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            html.classList.toggle('dark');
            if (html.classList.contains('dark')) {
                localStorage.theme = 'dark';
                if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
            } else {
                localStorage.theme = 'light';
                if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }

    // --- Notification Dropdown ---
    const notifBtn = document.getElementById('notificationBtn');
    const notifDropdown = document.getElementById('notificationDropdown');

    if (notifBtn && notifDropdown) {
        notifBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notifDropdown.classList.toggle('hidden');
        });

        document.addEventListener('click', (e) => {
            if (!notifDropdown.contains(e.target) && !notifBtn.contains(e.target)) {
                notifDropdown.classList.add('hidden');
            }
        });
    }

    // --- Profile Overlay ---
    const overlay = document.getElementById("profileOverlay");
    const navProfileBtn = document.getElementById("navProfileBtn");
    const headerProfileBtn = document.getElementById("headerProfileBtn");
    const closeBtn = document.getElementById("closeProfileOverlay");
    const closeBtnBottom = document.getElementById("closeProfileBtnBottom");

    function openProfile() { if (overlay) overlay.classList.remove("hidden"); }
    function closeProfile() { if (overlay) overlay.classList.add("hidden"); }

    if (navProfileBtn) navProfileBtn.addEventListener("click", openProfile);
    if (headerProfileBtn) headerProfileBtn.addEventListener("click", openProfile);
    if (closeBtn) closeBtn.addEventListener("click", closeProfile);
    if (closeBtnBottom) closeBtnBottom.addEventListener("click", closeProfile);

    if (overlay) {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) closeProfile();
        });
    }
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '../index.html';
        });
    }

    // --- Problem Section Logic ---
    const problemTabs = document.querySelectorAll('.problem-tab');
    const problemTabContents = document.querySelectorAll('.problem-tab-content');

    problemTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            problemTabs.forEach(t => t.classList.remove('active', 'border-primary-500', 'text-primary-600'));
            tab.classList.add('active', 'border-primary-500', 'text-primary-600');

            const target = tab.dataset.tab;
            problemTabContents.forEach(content => {
                if (content.id === target) content.classList.remove('hidden');
                else content.classList.add('hidden');
            });
        });
    });

    const btnCreateProblem = document.getElementById('btn-create-problem');
    const problemsListContainer = document.getElementById('problems-list-container');
    const problemFormView = document.getElementById('problem-form-view');
    const btnBackToList = document.getElementById('btn-back-to-list');

    if (btnCreateProblem) {
        btnCreateProblem.addEventListener('click', () => {
            problemsListContainer.classList.add('hidden');
            problemFormView.classList.remove('hidden');
        });
    }

    if (btnBackToList) {
        btnBackToList.addEventListener('click', () => {
            problemFormView.classList.add('hidden');
            problemsListContainer.classList.remove('hidden');
        });
    }

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.bookmark-btn');
        if (btn) {
            const icon = btn.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas', 'text-yellow-400');
            } else {
                icon.classList.add('far');
                icon.classList.remove('fas', 'text-yellow-400');
            }
        }
    });

    // --- Task Page Logic ---
    const taskInput = document.getElementById('newTaskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    if (addTaskBtn && taskInput && taskList) {
        addTaskBtn.addEventListener('click', () => {
            const text = taskInput.value.trim();
            if (text) {
                const li = document.createElement('li');
                li.className = "flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg group";
                li.innerHTML = `
                    <div class="flex items-center gap-3">
                        <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500">
                        <span class="text-sm text-gray-700 dark:text-gray-200">${text}</span>
                    </div>
                    <button class="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity delete-task-btn">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                `;
                taskList.appendChild(li);
                taskInput.value = '';
            }
        });

        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTaskBtn.click();
        });

        taskList.addEventListener('click', (e) => {
            if (e.target.closest('.delete-task-btn')) {
                e.target.closest('li').remove();
            }
        });
    }
    // --- Contest Logic ---
    const btnCreateContest = document.getElementById('btn-create-contest');
    const contestFormView = document.getElementById('contest-form-view');
    const sectionManageContests = document.getElementById('section-manage-contests');
    const btnBackToContestList = document.getElementById('btn-back-to-contest-list');

    // Toggle Contest Form
    if (btnCreateContest && contestFormView && sectionManageContests) {
        btnCreateContest.addEventListener('click', () => {
            // Hide the list part specifically, but we are ALREADY in #section-manage-contests
            // The structure is: #section-manage-contests (List) AND #contest-form-view (Form) are siblings?
            // Wait, my HTML edit put them as siblings in the HTML file, but currently only one CONTENT section is shown at a time via `showSection`.
            // BUT, #contest-form-view is defined as a sibling of #section-manage-contests in the main structure?
            // Let's check the HTML structure I wrote.
            // I wrote: <div id="section-manage-contests" class="content-section">...</div> AND <div id="contest-form-view" class="...">...</div>
            // Wait, if #contest-form-view is NOT a `content-section`, it won't be hidden by `showSection` automatically if I navigate away.
            // But here I just want to toggle visibility WITHIN the contest tab.
            // Actually, if I want `showSection` to manage top-level tabs, `section-manage-contests` handles the nav.
            // When I click "Create Contest", I should probably hide the children of `section-manage-contests` or hide the section itself if the form is separate?
            // The form is separate `div id="contest-form-view"`.
            // So:
            sectionManageContests.classList.add('hidden');
            contestFormView.classList.remove('hidden');
        });
    }

    if (btnBackToContestList) {
        btnBackToContestList.addEventListener('click', () => {
            contestFormView.classList.add('hidden');
            sectionManageContests.classList.remove('hidden');
        });
    }

    // Contest Tabs
    const contestTabUpcoming = document.getElementById('contest-tab-upcoming');
    const contestTabPast = document.getElementById('contest-tab-past');
    const contestListUpcoming = document.getElementById('contest-list-upcoming');
    const contestListPast = document.getElementById('contest-list-past');

    if (contestTabUpcoming && contestTabPast) {
        contestTabUpcoming.addEventListener('click', () => {
            contestTabUpcoming.classList.add('border-primary-500', 'text-primary-600', 'dark:text-primary-400', 'active');
            contestTabUpcoming.classList.remove('border-transparent', 'text-gray-500');
            contestTabPast.classList.remove('border-primary-500', 'text-primary-600', 'dark:text-primary-400', 'active');
            contestTabPast.classList.add('border-transparent', 'text-gray-500');

            contestListUpcoming.classList.remove('hidden');
            contestListPast.classList.add('hidden');
        });

        contestTabPast.addEventListener('click', () => {
            contestTabPast.classList.add('border-primary-500', 'text-primary-600', 'dark:text-primary-400', 'active');
            contestTabPast.classList.remove('border-transparent', 'text-gray-500');
            contestTabUpcoming.classList.remove('border-primary-500', 'text-primary-600', 'dark:text-primary-400', 'active');
            contestTabUpcoming.classList.add('border-transparent', 'text-gray-500');

            contestListPast.classList.remove('hidden');
            contestListUpcoming.classList.add('hidden');
        });
    }

    // Add Problem to Contest Logic
    const btnAddProblemToContest = document.getElementById('btn-add-problem-to-contest');
    const contestProblemSelect = document.getElementById('contest-problem-select');
    const addedProblemsList = document.getElementById('added-problems-list');

    if (btnAddProblemToContest && contestProblemSelect && addedProblemsList) {
        btnAddProblemToContest.addEventListener('click', () => {
            const problemTitle = contestProblemSelect.value;
            if (problemTitle) {
                // Check if already added? (Optional, but good UX)
                // For now, just append
                const tr = document.createElement('tr');
                tr.className = "group border-b border-gray-100 dark:border-gray-700 last:border-0";
                tr.innerHTML = `
                    <td class="px-4 py-2 text-gray-800 dark:text-gray-200 text-sm">${problemTitle}</td>
                    <td class="px-4 py-2 text-right">
                        <button type="button" class="text-gray-400 hover:text-red-500 transition-colors remove-contest-problem-btn">
                            <i class="fas fa-times"></i>
                        </button>
                    </td>
                `;
                addedProblemsList.appendChild(tr);
                contestProblemSelect.value = ""; // Reset dropdown
            }
        });

        // Remove delegation
        addedProblemsList.addEventListener('click', (e) => {
            const btn = e.target.closest('.remove-contest-problem-btn');
            if (btn) {
                btn.closest('tr').remove();
            }
        });
    }
    // --- Dashboard Charts ---
    function initDashboardCharts() {
        // Check if elements exist
        const ctxPerformance = document.getElementById('performanceChart');
        const ctxDifficulty = document.getElementById('difficultyChart');

        if (ctxPerformance && ctxDifficulty) {
            // Chart Global Defaults for Dark/Light theme - adapting to current style
            // We'll style charts to look good on both backgrounds with neutral colors.
            Chart.defaults.color = '#6b7280'; // Gray 500
            Chart.defaults.borderColor = 'rgba(107, 114, 128, 0.1)'; // Gray 500 @ 10%

            // 1. Student Performance Distribution (Bar Chart)
            new Chart(ctxPerformance, {
                type: 'bar',
                data: {
                    labels: ['Excellent', 'Good', 'Average', 'Needs Imp.'],
                    datasets: [{
                        label: 'Students',
                        data: [65, 80, 55, 20],
                        backgroundColor: [
                            '#3b82f6', // Blue
                            '#10b981', // Emerald
                            '#f59e0b', // Amber
                            '#ef4444'  // Red
                        ],
                        borderRadius: 4,
                        maxBarThickness: 30
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: { backgroundColor: '#1f2937', titleColor: '#fff', bodyColor: '#fff' }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: 'rgba(107, 114, 128, 0.1)' }
                        },
                        x: {
                            grid: { display: false }
                        }
                    }
                }
            });

            // 2. Problem Difficulty vs Solve Rate (Line Chart)
            new Chart(ctxDifficulty, {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [
                        {
                            label: 'Easy',
                            data: [85, 88, 92, 95],
                            borderColor: '#3b82f6',
                            tension: 0.4,
                            pointBackgroundColor: '#3b82f6'
                        },
                        {
                            label: 'Medium',
                            data: [60, 65, 58, 70],
                            borderColor: '#f59e0b',
                            tension: 0.4,
                            pointBackgroundColor: '#f59e0b'
                        },
                        {
                            label: 'Hard',
                            data: [30, 35, 40, 45],
                            borderColor: '#ef4444',
                            tension: 0.4,
                            pointBackgroundColor: '#ef4444'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: { color: '#9ca3af', boxWidth: 10 }
                        },
                        tooltip: { backgroundColor: '#1f2937', titleColor: '#fff', bodyColor: '#fff' }
                    },
                    scales: {
                        y: {
                            grid: { color: '#374151' }
                        },
                        x: {
                            grid: { display: false }
                        }
                    }
                }
            });
        }
    }

    // Call init
    // --- Student Search Logic ---
    const studentSearchInput = document.getElementById('studentSearchInput');
    const studentTableBody = document.querySelector('#section-manage-class tbody');
    const btnAddStudent = document.getElementById('btn-add-student');
    const studentListContainer = document.getElementById('student-list-container');
    const studentFormView = document.getElementById('student-form-view');
    const btnBackToStudentList = document.getElementById('btn-back-to-student-list');

    if (btnAddStudent && studentListContainer && studentFormView) {
        btnAddStudent.addEventListener('click', () => {
            studentListContainer.classList.add('hidden');
            studentFormView.classList.remove('hidden');
        });
    }

    if (btnBackToStudentList && studentListContainer && studentFormView) {
        btnBackToStudentList.addEventListener('click', () => {
            studentFormView.classList.add('hidden');
            studentListContainer.classList.remove('hidden');
        });
    }

    if (studentSearchInput && studentTableBody) {
        studentSearchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const rows = studentTableBody.querySelectorAll('tr');

            rows.forEach(row => {
                // Get text content from the row
                const text = row.innerText.toLowerCase();
                // Check if row contains search term
                if (text.includes(searchTerm)) {
                    row.classList.remove('hidden');
                } else {
                    row.classList.add('hidden');
                }
            });
        });
    }

    // --- Dashboard Charts ---
    initDashboardCharts();

    // --- Quill Editor Init ---
    if (document.getElementById('editor-container')) {
        const quill = new Quill('#editor-container', {
            theme: 'snow',
            placeholder: 'Write problem description here...',
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'font': [] }],
                    [{ 'align': [] }],
                    ['clean']
                ]
            }
        });
    }

    // --- Forum Logic ---
    const newPostBtn = document.getElementById('newPostBtn');
    const forumListView = document.getElementById('forum-list-view');
    const forumFormView = document.getElementById('forum-form-view');
    const btnCancelPostFooter = document.getElementById('btn-cancel-post-footer');
    const btnBackPost = document.getElementById('btn-back-post');

    if (newPostBtn && forumListView && forumFormView) {
        newPostBtn.addEventListener('click', () => {
            forumListView.classList.add('hidden');
            forumFormView.classList.remove('hidden');
        });
    }

    function closeForumForm() {
        if (forumFormView && forumListView) {
            forumFormView.classList.add('hidden');
            forumListView.classList.remove('hidden');
        }
    }

    if (btnCancelPostFooter) btnCancelPostFooter.addEventListener('click', closeForumForm);
    if (btnBackPost) btnBackPost.addEventListener('click', closeForumForm);

    const forumForm = forumFormView ? forumFormView.querySelector('form') : null;
    if (forumForm) {
        forumForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate Post
            alert("Discussion posted successfully!");
            forumForm.reset();
            forumFormView.classList.add('hidden');
            forumListView.classList.remove('hidden');
        });
    }



    // --- Reports Logic ---
    const reportTypeSelect = document.getElementById('reportType');
    const actionBtn = document.getElementById('actionBtn');
    const reportFilterContainer = document.getElementById('filterContainer');
    const reportFormatBadge = document.getElementById('formatBadge');
    const reportPreviewTitle = document.getElementById('previewTitle');
    const reportTableContainer = document.getElementById('previewTableContainer');
    const reportDateSpan = document.getElementById('currentDateReport');
    const reportContentDiv = document.getElementById('report-content');

    if (reportTypeSelect && actionBtn && reportFilterContainer) {
        const fullData = {
            Students: {
                headers: ["Name", "ID", "Program", "Year", "Branch", "Score"],
                rows: [
                    ["Arjun Mehta", "CS01", "B.Tech", "3rd", "CSE", "920"],
                    ["Sara Khan", "CS02", "B.Tech", "2nd", "IT", "850"],
                    ["Liam Smith", "CS03", "B.E", "4th", "ME", "740"],
                    ["Priya Das", "CS04", "M.Tech", "1st", "CSE", "980"]
                ],
                config: { format: 'XLSX', color: 'bg-emerald-500' }
            },
            Contests: {
                headers: ["Contest Title", "Date", "Subject", "Participants", "Status"],
                rows: [
                    ["Weekly Sprint #88", "Dec 20", "Data Structures", "1,240", "Live"],
                    ["Algorithm Master", "Dec 12", "Algorithms", "850", "Past"],
                    ["Logic Lab", "Jan 05", "Discrete Math", "400", "Upcoming"]
                ],
                config: { format: 'PDF', color: 'bg-rose-500' }
            },
            Problems: {
                headers: ["Problem", "Topic", "Language", "Difficulty", "Bookmark"],
                rows: [
                    ["Two Sum", "Arrays", "C++", "Easy", "Yes"],
                    ["Merge Sort", "Sorting", "Java", "Medium", "No"],
                    ["Graph DFS", "Graphs", "Python", "Hard", "Yes"]
                ],
                config: { format: 'XLSX', color: 'bg-blue-500' }
            }
        };

        function syncReportTable() {
            const type = reportTypeSelect.value;
            const activeIndices = Array.from(reportFilterContainer.querySelectorAll('.col-toggle'))
                .filter(i => i.checked)
                .map(i => parseInt(i.dataset.index));

            if (activeIndices.length === 0) {
                reportTableContainer.innerHTML = '<div class="py-20 text-center text-gray-400 italic">No columns selected</div>';
                return;
            }

            let html = `<table class="report-table"><thead><tr>`;
            activeIndices.forEach(i => html += `<th>${fullData[type].headers[i]}</th>`);
            html += `</tr></thead><tbody>`;

            fullData[type].rows.forEach(row => {
                html += `<tr>`;
                activeIndices.forEach(i => html += `<td>${row[i]}</td>`);
                html += `</tr>`;
            });
            html += `</tbody></table>`;
            reportTableContainer.innerHTML = html;
        }

        function initReportUI() {
            const type = reportTypeSelect.value;

            // 1. Setup Filters
            reportFilterContainer.innerHTML = '<p class="text-[10px] font-bold text-gray-400 uppercase mb-2">Sections to Include</p>';
            fullData[type].headers.forEach((h, i) => {
                const label = document.createElement('label');
                label.className = "flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg cursor-pointer transition-all";
                label.innerHTML = `
                    <input type="checkbox" checked data-index="${i}" class="col-toggle w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500">
                    <span class="text-xs font-medium text-gray-600 dark:text-gray-300">${h}</span>
                `;
                label.querySelector('input').addEventListener('change', syncReportTable);
                reportFilterContainer.appendChild(label);
            });

            // 2. Setup Action Button
            actionBtn.className = `w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${fullData[type].config.color}`;
            actionBtn.innerHTML = `<i class="fas ${fullData[type].config.format === 'PDF' ? 'fa-file-pdf' : 'fa-file-excel'}"></i> Download ${fullData[type].config.format}`;

            if (reportFormatBadge) reportFormatBadge.innerText = fullData[type].config.format;
            if (reportPreviewTitle) reportPreviewTitle.innerText = `${type} Report`;

            syncReportTable();
        }

        function handleReportDownload() {
            const type = reportTypeSelect.value;
            const activeIndices = Array.from(reportFilterContainer.querySelectorAll('.col-toggle'))
                .filter(i => i.checked)
                .map(i => parseInt(i.dataset.index));

            // Extract filtered data
            const filteredHeaders = activeIndices.map(i => fullData[type].headers[i]);
            const filteredRows = fullData[type].rows.map(row => activeIndices.map(i => row[i]));
            const exportData = [filteredHeaders, ...filteredRows];

            if (fullData[type].config.format === 'PDF') {
                if (typeof html2pdf === 'undefined') {
                    alert('PDF Library not loaded');
                    return;
                }
                const element = reportContentDiv;
                html2pdf().set({
                    margin: 10,
                    filename: `CampusCode_${type}_Report.pdf`,
                    html2canvas: { scale: 3 },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                }).from(element).save();
            } else {
                if (typeof XLSX === 'undefined') {
                    alert('Excel Library not loaded');
                    return;
                }
                const ws = XLSX.utils.aoa_to_sheet(exportData);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "Report");
                XLSX.writeFile(wb, `CampusCode_${type}_Report.xlsx`);
            }
        }

        reportTypeSelect.addEventListener('change', initReportUI);
        actionBtn.addEventListener('click', handleReportDownload);

        if (reportDateSpan) reportDateSpan.innerText = new Date().toLocaleDateString('en-GB');

        // Initial call
        initReportUI();
    }


    // --- Support Section Logic ---
    // FAQ Toggle
    const faqContainer = document.getElementById('faqContainer');
    if (faqContainer) {
        faqContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.faq-toggle-btn');
            if (btn) {
                const item = btn.parentElement;
                const isActive = item.classList.contains('active');

                // Close all others
                faqContainer.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

                // Toggle current
                if (!isActive) item.classList.add('active');
            }
        });
    }

    // FAQ Search
    const faqSearch = document.getElementById('faqSearch');
    if (faqSearch) {
        faqSearch.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            document.querySelectorAll('.faq-item').forEach(item => {
                const text = item.innerText.toLowerCase();
                item.style.display = text.includes(term) ? 'block' : 'none';
            });
        });
    }

    // Support Form Handling
    const supportForm = document.getElementById('supportForm');
    if (supportForm) {
        supportForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
            btn.disabled = true;
            btn.classList.add('opacity-75', 'cursor-not-allowed');

            setTimeout(() => {
                this.classList.add('hidden');
                document.getElementById('successState').classList.remove('hidden');

                // Reset button for next time
                btn.innerText = originalText;
                btn.disabled = false;
                btn.classList.remove('opacity-75', 'cursor-not-allowed');
                this.reset();
            }, 1200);
        });
    }

});
