import React, { useState,useEffect  } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer ,Cell} from 'recharts';
import axios from "axios";
//by batool
const SignUp = ({ switchToSignIn, onSignUpSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isStudent, setIsStudent] = useState(false);
  const [universityId, setUniversityId] = useState('');
  const [error, setError] = useState('');


  // by marwa 
  


  const handleSignUp = async () => {
    if (!username || !password || (isStudent && !universityId)) {
      alert('Please fill all required fields.');
      return;
    }

    const user = {
      username,
      password,
      isStudent,
      universityId: isStudent ? universityId : "N/A",
    };

    try {
      const response = await fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        setError('Sign up failed. Please try again.');
      } else {
        alert('Sign up successful!');
        onSignUpSuccess(isStudent ? 'Admin' : 'Student');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
    <div className="bg-gray-700 p-8 rounded-xl text-center w-[320px] shadow-md">
   <h2 className="text-white text-2xl font-bold mb-6">Sign Up</h2>

        <label htmlFor="username" className="block mb-1  text-white text-white/40 text-lg">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-[95%] px-3 py-2 mb-3 bg-gray-500 border-none rounded text-white placeholder-white/60 focus:outline-none"
        />

        <label htmlFor="password" className="block mb-1 text-white/40 text-white text-lg">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-[95%] px-3 py-2  mb-3 bg-gray-500 border-none rounded text-white placeholder-white/60 focus:outline-none"
        />

        <div className="flex  text-white items-center mb-3 text-left">
          <input
            type="checkbox"
            id="is-student"
            checked={isStudent}
            onChange={(e) => setIsStudent(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="is-student" className="text-white/40 text-sm">I'm a student</label>
        </div>

        {isStudent && (
          <div id="university-id" className="mb-3">
            <label htmlFor="uni-id" className="block  text-white text-white/40 text-lg">University ID</label>
            <input
              id="uni-id"
              type="text"
              placeholder="Enter your university ID"
              value={universityId}
              onChange={(e) => setUniversityId(e.target.value)}
              className="w-[95%] px-3 py-2 mb-3 bg-gray-500 border-none rounded text-white placeholder-white/60 focus:outline-none"
            />
          </div>
        )}

        <button
          onClick={handleSignUp}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Sign Up
        </button>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        <p className="text-sm text-white text-white/40 mt-4">
          Already have an account?
          <br />
          <button
            onClick={switchToSignIn} 
            className="text-green-400 hover:underline"
          >
            Click here
          </button> to sign in.
        </p>
      </div>
    </div>
  );
};

//by batool
const SignIn = ({ switchToSignUp, onSignInSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({
    numberOfTasks: 0,
    numberOfFinishedProjects: 0,
    numberOfProjects: 0,
    numberOfStudents: 0,
  });
  const handleSignIn = async () => {
    if (!username || !password) {
      alert('Please fill all required fields.');
      return;
    }

    const user = {
      username,
      password,
      rememberMe, 
    };

    try {
      const response = await fetch('http://localhost:4000/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        setError('Sign in failed. Please try again.');
      } else {
        alert('Sign in successful!');
 
      
   const result = await response.json();
   localStorage.setItem('numberOfTasks', result.user.numberOfTasks);
   localStorage.setItem('numberOfFinishedProjects', result.user.numberOfFinishedProjects);
   localStorage.setItem('numberOfProjects', result.user.numberOfProjects);
   localStorage.setItem('numberOfStudents', result.user.numberOfStudents);

      const userRole = result.user.role;
      localStorage.setItem("userRole", result.user.role);

      if (userRole === 'Student') {
        localStorage.setItem('studentName', result.user.username);
        onSignInSuccess('Student'); 
      } else if (userRole === 'Admin') {
        localStorage.setItem('adminName', result.user.username); 
        onSignInSuccess('Admin'); 
      } else {
        setError('Unknown role returned from the server.');
      }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-700 p-8 rounded-xl text-center w-[320px] shadow-md">
        <h2 className="text-white text-2xl font-bold mb-6">Sign In</h2>
  
        <label htmlFor="username" className="block mb-2 text-white text-left">
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-[95%] px-3 py-2 mb-3 bg-gray-500 border-none rounded text-white placeholder-white/60 focus:outline-none"
        />
  
        <label htmlFor="password" className="block mb-2 text-white text-left">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-[95%] px-3 py-2 mb-3 bg-gray-500 border-none rounded text-white placeholder-white/60 focus:outline-none"
        />
  
        <div className="flex items-center mb-5 text-left">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="remember-me" className="text-white text-sm">
            Remember Me
          </label>
        </div>
  
        <button
          onClick={handleSignIn}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
        >
          Sign In
        </button>
  
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
  
        <p className="text-sm text-white mt-6">
          Don't have an account?
          <br />
          <button
            onClick={switchToSignUp}
            className="text-green-400 hover:underline"
          >
            Click here
          </button>{" "}
          to sign up.
        </p>
      </div>
    </div>
  );
  
};
//by batool
const App = () => {
  const [isSignUp, setIsSignUp] = useState(false); 
  const [userType, setUserType] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const [currentTime, setCurrentTime] = useState(new Date());
  const data = [
    {
      name: 'Projects',
      value: Number(localStorage.getItem('numberOfProjects')),
    },
    {
      name: 'Students',
      value: Number(localStorage.getItem('numberOfStudents')) ,
    },
    {
      name: 'Tasks',
      value: Number(localStorage.getItem('numberOfTasks')),
    },
    {
      name: 'Finished',
      value: Number(localStorage.getItem('numberOfFinishedProjects')) ,
    },
  ];









//by batool
  const data1 = [
   
    {
      name: 'Tasks',
      value: Number(localStorage.getItem('numberOfTasks')),
    },
    {
      name: 'Finished',
      value: Number(localStorage.getItem('numberOfFinishedProjects')) ,
    },
  ];








//by batool
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); 
    return () => clearInterval(timer);
  }, []);

  const sections = ["home", "projects", "tasks", "chat"];

  const showSection = (section) => setActiveSection(section);
//by batool
  const handleLogout = async () => {
    const username = localStorage.getItem('adminName') ; 
  
    if (!username) {
      alert('No user is logged in');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:4000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }), 
      });
  
      if (response.ok) {
        console.log('Logout successful');
        localStorage.removeItem('adminName'); 
        localStorage.removeItem('numberOfTasks');
        localStorage.removeItem('numberOfFinishedProjects');
        localStorage.removeItem('numberOfProjects');
        localStorage.removeItem('numberOfStudents');
        setUserType(null); 
        setActiveSection("home"); 
      } else {
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('An error occurred during logout.');
    }
  };
  
//by batool
  const handleLogoutstu = async () => {
    const username = localStorage.getItem('studentName') ;
  
    if (!username) {
      alert('No user is logged in');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:4000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
  
      if (response.ok) {
        console.log('Logout successful');
        localStorage.removeItem('studentName'); 
        localStorage.removeItem('numberOfTasks');
localStorage.removeItem('numberOfFinishedProjects');
localStorage.removeItem('numberOfProjects');
localStorage.removeItem('numberOfStudents');
        setUserType(null);  
        setActiveSection("home"); 
      } else {
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('An error occurred during logout.');
    }
  };


  const switchToSignUp = () => {
    setIsSignUp(true);
  };

  const switchToSignIn = () => {
    setIsSignUp(false);
  };

  const onSignUpSuccess = (type) => {
    setUserType(type);
  };

  const onSignInSuccess = (type) => {
    setUserType(type);
  };


//by batool
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [students, setStudents] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/api/users-by-role")
      .then((response) => {
        setStudents(response.data.students || []);
        setAdmins(response.data.admins || []);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);


//by batool
  const currentUser = localStorage.getItem("adminName") || localStorage.getItem("studentName");
  
  //by marwa
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [category, setCategory] = useState("");
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const [status, setStatus] = useState("In Progress");
const [selectedStudents, setSelectedStudents] = useState([]);
const [projects, setProjects] = useState([]);
const [searchProjects, setSearchProjects] = useState([]);
const [searchKeyword, setSearchKeyword] = useState("");
const [projectStatusFilter, setProjectStatusFilter] = useState("");
const [projectStudents, setProjectStudents] = useState({});
const [selectedProject, setSelectedProject] = useState("");
const [sidebarOpen, setSidebarOpen] = useState(false);
const [projectTasks, setProjectTasks] = useState([]);



useEffect(() => {
  const fetchAllProjectStudents = async () => {
    const studentsMap = {};
    for (const project of projects) {
      try {
        const response = await fetch(`http://localhost:4000/api/project-students/${encodeURIComponent(project.title)}`);
        if (response.ok) {
          const data = await response.json();
          studentsMap[project.title] = data;
        }
      } catch (err) {
        console.error(`Error fetching students for ${project.title}`, err);
      }
    }
    setProjectStudents(studentsMap);
  };

  if (projects.length > 0) {
    fetchAllProjectStudents();
  }
}, [projects]);
{/* استخدم useEffect لتحميل المشاريع تلقائيًا عند تغيير activeSection أو userType */}
useEffect(() => {
  if (activeSection === "projects" && userType === "Student") {
    const studentName = localStorage.getItem("studentName");
    if (studentName) {
      fetchProjectsByStudent(studentName);
    }
  }
}, [activeSection, userType]);

// دالة لتحميل المشاريع الخاصة بالطالب
const fetchProjectsByStudent = async (studentName) => {
  try {
    const response = await fetch(`http://localhost:4000/api/projects-by-student/${studentName}`);
    if (response.ok) {
      const data = await response.json();
      setProjects(data); // تحديث قائمة المشاريع
    } else {
      alert("فشل في جلب المشاريع.");
    }
  } catch (error) {
    console.error(error);
    alert("حدث خطأ أثناء جلب المشاريع.");
  }
};

const fetchProjectsByStatus = async (status) => {
  if (!status) {
    // إذا ما تم اختيار حالة، نعيد المشاريع كلها للمشرف الحالي
    const adminName = localStorage.getItem("adminName");
    const response = await fetch(`http://localhost:4000/api/projects-by-admin/${adminName}`);
    const data = await response.json();
    setProjects(data);
    return;
  }

  try {
    const response = await fetch(`http://localhost:4000/api/projects/status/${status}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      setProjects(data);
    } else {
      alert("فشل في جلب المشاريع حسب الحالة.");
    }
  } catch (error) {
    console.error(error);
    alert("حدث خطأ أثناء جلب المشاريع حسب الحالة.");
  }
};




useEffect(() => {
  const fetchProjects = async () => {
    const adminName = localStorage.getItem("adminName");
    try {
      const res = await fetch(`http://localhost:4000/api/projects-by-admin/${adminName}`);
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("فشل في جلب المشاريع:", error);
    }
  };

  fetchProjects();
}, []);


  
  //const [students, setStudents] = useState([]);

useEffect(() => {
  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/users-by-role");
      setStudents(response.data.students || []);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  fetchStudents();
}, []);

  useEffect(() => {
    if (!selectedUser) return;
    axios.get(`http://localhost:4000/api/getMsg?sender=${currentUser}&receiver=${selectedUser}`)
    .then((res) => {
      setMessages(res.data);
    })
    .catch((err) => {
      console.error("Error fetching messages", err);
    });
}, [selectedUser]);
//by batool
const sendMessage = () => {
  const currentUser = localStorage.getItem("adminName") || localStorage.getItem("studentName");

  if (!messageInput.trim()) return;

  axios.post("http://localhost:4000/api/sendMsg", {
    sender: currentUser,
    receiver: selectedUser,
    message: messageInput,
  }).then(() => {
    setMessageInput("");
    setMessages((prev) => [...prev, { sender: currentUser, message: messageInput }]);
  }).catch((err) => {
    console.error("Error sending message", err);
  });
};
//////
//by another
//start here
//by lara
//for Admin page:
const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState("taskStatus");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editTaskData, setEditTaskData] = useState(null);

  const adminName = localStorage.getItem("adminName");

useEffect(() => {
  if (!adminName) return;

  fetch(`http://localhost:4000/api/tasks/byAdmin/${adminName}`)
    .then((res) => res.json())
    .then((data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const updatedTasks = data.map((task) => {
        const taskDate = new Date(task.taskDueDate);
        taskDate.setHours(0, 0, 0, 0);

        // إذا كانت المهمة قديمة ولسا مش completed
        if (taskDate < today && task.taskStatus !== "completed") {
          // نرسل تحديث للسيرفر
          fetch(`http://localhost:4000/api/tasks/${task.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...task, taskStatus: "completed" }),
          })
            .then((res) => {
              if (!res.ok) throw new Error("Failed to update task");
            })
            .catch((err) => console.error("❌ Error updating task:", err));

          // نعدّل المهمة محليًا
          return { ...task, taskStatus: "completed" };
        }

        return task;
      });

      // ترتيب المهام حسب sortBy
      const sorted = [...updatedTasks].sort((a, b) => {
        if (sortBy === "taskStatus") {
          return a.taskStatus.localeCompare(b.taskStatus);
        } else if (sortBy === "taskName") {
          return a.taskName.localeCompare(b.taskName);
        } else if (sortBy === "taskDueDate") {
          return new Date(a.taskDueDate) - new Date(b.taskDueDate);
        }
        return 0;
      });

      setTasks(sorted);
    })
    .catch((err) => console.error("❌ Error fetching tasks:", err));
}, [sortBy, adminName]);

 
  // ✅ جلب المهام من الباك
  useEffect(() => {
  fetch(`http://localhost:4000/api/tasks?sortBy=${sortBy}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Tasks from backend:", data);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const updatedTasks = data.map((task) => {
        const taskDate = new Date(task.taskDueDate);
        taskDate.setHours(0, 0, 0, 0);

        if (taskDate < today) {
          return { ...task, taskStatus: "completed" };
        }
        return task;
      });

      setTasks(updatedTasks);
    })
    .catch((err) => console.error("Error fetching tasks:", err));
}, [sortBy]);

  // ✅ جلب المشاريع والطلاب
  useEffect(() => {
  if (!adminName) return;

  fetch(`http://localhost:4000/api/projects/byAdmin/${adminName}`)
    .then((res) => res.json())
    .then((data) => {
      setProjects(data);
    })
    .catch((err) => console.error("❌ Error fetching admin projects:", err));
}, [adminName]);

  useEffect(() => {
  
  fetch("http://localhost:4000/api/students")
    .then((res) => res.json())
    .then((data) => setStudents(data))
    .catch((err) => console.error("❌ Error fetching students:", err));
}, []);

  useEffect(() => {
  fetch("http://localhost:4000/api/students")
    .then((res) => res.json())
    .then((data) => setStudents(data))
    .catch((err) => console.error("Error fetching students:", err));
}, []);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleDelete = () => {
    const id = prompt("Enter task ID to delete:");
    if (!id) return;

    fetch(`http://localhost:4000/api/tasks/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setTasks((prev) => prev.filter((task) => task.id !== parseInt(id)));
        }
      })
      .catch((err) => console.error("Error deleting task:", err));
  };

  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateSubmit = (e) => {
  e.preventDefault();
  const form = e.target;

  const newTask = {
    projectTitle: selectedProject, // ✅ التعديل هنا
    taskName: form.taskName.value,
    taskDescription: form.taskDescription.value,
    taskAssignee: form.taskAssignee.value,
    taskStatus: form.taskStatus.value,
    taskDueDate: form.taskDueDate.value,
  };

  fetch("http://localhost:4000/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.taskId) {
        setTasks((prev) => [...prev, { ...newTask, id: data.taskId }]);
        setIsCreateModalOpen(false);
        // ✅ تفريغ الفورم بعد الإضافة (اختياري)
        setSelectedProject("");
      } else {
        console.error("Failed to add task to DB");
      }
    })
    .catch((err) => {
      console.error("Error submitting task:", err);
    });
};


  const handleEditClick = (task) => {
    setEditTaskData(task);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/api/tasks/${editTaskData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editTaskData),
    })
      .then((res) => {
        if (res.ok) {
          setTasks((prev) =>
            prev.map((t) => (t.id === editTaskData.id ? editTaskData : t))
          );
          setIsEditModalOpen(false);
        }
      })
      .catch((err) => {
        console.error("Error updating task:", err);
      });
  };
const handleProjectChange = async (e) => {
  const selected = e.target.value;
  setSelectedProject(selected);

  // نجيب الطلاب المشتركين
  fetch(`http://localhost:4000/api/projectstudents/${selected}`)
    .then((res) => res.json())
    .then((data) => {
      setProjectStudents(data.map(item => item.studentUsername));
    })
    .catch((err) => {
      console.error("❌ Error fetching project students:", err);
      setProjectStudents([]);
    });
};
useEffect(() => {
  if (!selectedProject) return;

  fetch(`http://localhost:4000/api/projectstudents/${selectedProject}`)
    .then(res => res.json())
    .then(data => {
      console.log("📦 projectStudents:", data); // بس عشان نتاكد شو راجع
      setProjectStudents(Array.isArray(data) ? data : []); // نتاكد انه Array
    })
    .catch(err => {
      console.error("❌ Error fetching project students:", err);
      setProjectStudents([]); // فاضية في حال صار خطأ
    });
}, [selectedProject]);


//by lara
//for Student page:
  const studentName = localStorage.getItem("studentName"); // يُفترض أنك خزّنته بعد تسجيل الدخول

  useEffect(() => {
    if (!studentName) {
      console.warn("❌ لا يوجد اسم طالب مخزن. يرجى تسجيل الدخول أولاً.");
      return;
    }

    fetch(`http://localhost:4000/api/tasks/student/${studentName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Tasks for:", studentName, data);
        setTasks(data);
      })
      .catch((err) => {
        console.error("❌ Error fetching tasks:", err);
        setTasks([]);
      });
  }, [studentName]);


//by batool
  return (
    <div>
      {userType ? (
        userType === 'Admin' ? (
            <div className="flex bg-gray-900 h-screen bg-[#111] text-white">
              
              {/* Sidebar */}
              <div className="w-64  bg-[#1a1a1a] p-4 flex flex-col gap-4">
                {["home", "projects", "tasks", "chat"].map((section) => (
                  <button
                    key={section}
                    onClick={() => showSection(section)}
                    className={`text-left px-4 bg-gray-700 py-2 rounded ${
                      activeSection === section
                        ? "bg-blue-600 font-bold"
                        : "bg-[#3a3a3a] hover:bg-[#4a4a4a]"
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </div>
          
              {/* Main content */}
              <div className="flex-1 p-8 overflow-auto">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-blue-500">Welcome to the Task Management System</h1>
                  <div>
                  <p className="text-sm">
      {currentTime.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })}
    </p>
                    <p className="text-right  font-semibold"> Admin {localStorage.getItem("adminName")}</p>
                    </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded ml-4"
                  >
                    Logout
                  </button>
                </div>
          
                {activeSection === "home" && (
                  <>
                    {/* Overview Cards */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      {[
                        { title: "Number of Projects", key: "numberOfProjects" },
                        { title: "Number of Students", key: "numberOfStudents" },
                        { title: "Number of Tasks", key: "numberOfTasks" },
                        { title: "Number of Finished Projects", key: "numberOfFinishedProjects" },
                      ].map((item) => (
                        <div key={item.key} className="bg-[#222] p-4 rounded  bg-gray-700 shadow text-center">
                          <h3 className="font-bold text-lg">{item.title}</h3>
                          <p className="text-2xl text-white mt-2">{localStorage.getItem(item.key)}</p>
                        </div>
                      ))}
                    </div>
          
                    {/* Placeholder Chart */}
                    <div className="bg-[#1a1a1a] p-4 rounded h-64">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="name" stroke="#aaa" />
        <YAxis stroke="#aaa" />
        <Tooltip
          contentStyle={{ backgroundColor: '#333', border: 'none' }}
          cursor={{ fill: 'transparent' }} 
        />
        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
                  </>
                )}
          


          
          
          {activeSection === "projects" && userType === 'Admin' && (
  <div className="space-y-6">
    {/* العنوان في صف لحاله */}
    <div>
      <h2 className="text-xl font-semibold text-blue-500">Projects Overview</h2>
    </div>
    {/* صف الأزرار والإنبوت */}
    <div className="flex flex-wrap items-center space-x-4">
      

      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Add New Project
      </button>

      <input
        type="text"
        placeholder="Search Projects..."
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
      />

      <button
        onClick={async () => {
          console.log("تم الضغط على الزر بحث!");
          const adminName = localStorage.getItem("adminName");

          try {
            // إذا كان مربع البحث فارغ، نعرض المشاريع الأصلية
            const url = searchKeyword.trim() 
              ? `http://localhost:4000/api/search-projects/${searchKeyword}`
              : `http://localhost:4000/api/projects-by-admin/${adminName}`; // افترض وجود API لعرض كل المشاريع في حال كانت الكلمة فارغة
            
            const response = await fetch(url, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (response.ok) {
              const data = await response.json();
              setProjects(data); // تحديث المشاريع بناءً على نتائج البحث
            } else {
              alert("فشل في جلب المشاريع.");
            }
          } catch (error) {
            console.error(error);
            alert("حدث خطأ أثناء جلب المشاريع.");
          }
        }}
        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    <select
  value={projectStatusFilter}
  onChange={(e) => {
    const selectedStatus = e.target.value;
    setProjectStatusFilter(selectedStatus);
    fetchProjectsByStatus(selectedStatus);
  }}
  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
>
  <option value="">All Statuses</option>
  <option value="In Progress">In Progress</option>
  <option value="Completed">Completed</option>
  <option value="Pending">Pending</option>
  <option value="On Hold">On Hold</option>
  <option value="Cancelled">Cancelled</option>
</select>

    </div>

    {/* الكروت: Projects List */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
      <div
      key={index}
      onClick={async () => {
        setSelectedProject(project);
        setSidebarOpen(true);
        try {
          const res = await fetch(`http://localhost:4000/api/tasks-by-project/${project.title}`);
          if (res.ok) {
            const data = await res.json();
            setProjectTasks(data);
          } else {
            alert("فشل في جلب التاسكات");
            setProjectTasks([]);
          }
        } catch (err) {
          console.error(err);
          alert("خطأ أثناء جلب التاسكات");
        }
      }}
      className="bg-gray-800 border border-gray-700 p-5 rounded-xl shadow-lg"
    >
      <h3 className="text-xl font-semibold text-blue-400 mb-2">{project.title}</h3>
      <p className="text-sm text-gray-300 mb-1">{project.description}</p>
      <p className="text-sm text-yellow-300">Category: {project.category}</p>
    
      {projectStudents[project.title] && (
        <div className="mt-2">
          <p className="text-sm text-purple-300 font-semibold">Students:</p>
          <ul className="list-disc list-inside text-white text-sm">
            {projectStudents[project.title].map((student, idx) => (
              <li key={idx}>{student}</li>
            ))}
          </ul>
        </div>
      )}
    
      <p className="text-sm text-green-300">Status: {project.status}</p>
    
      {project.startDate && project.endDate && (() => {
        const start = new Date(project.startDate);
        const end = new Date(project.endDate);
        const today = new Date();
        const totalDuration = end - start;
        const elapsed = today - start;
        const progress = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
        return (
          <div className="mt-3">
            <p className="text-sm text-white mb-1">Progress: {progress.toFixed(0)}%</p>
            <div className="w-full h-3 bg-gray-600 rounded-full">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-300 mt-1">
              <span>{project.startDate?.slice(0, 10)}</span>
              <span>{project.endDate?.slice(0, 10)}</span>
            </div>
          </div>
        );
      })()}
    </div>
    
      ))}
    </div>
    {sidebarOpen && selectedProject && (
  <div className="fixed top-0 right-0 h-full w-full max-w-md bg-gray-900 shadow-lg z-50 overflow-y-auto transition-transform transform duration-300 border-2 border-blue-400">
    <div className="p-5 space-y-4">
      {/* زر إغلاق */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-blue-400">Project Details</h2>
        <button
          onClick={() => {
            setSidebarOpen(false);
            setSelectedProject(null);
            setProjectTasks([]);
          }}
          className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
        >
          X
        </button>
      </div>

      {/* بيانات المشروع */}
      <div className="space-y-2">
        <p><span className="text-yellow-400 font-medium">Title:</span> {selectedProject.title}</p>
        <p><span className="text-yellow-400 font-medium">Description:</span> {selectedProject.description}</p>
        <p><span className="text-yellow-400 font-medium">Category:</span> {selectedProject.category}</p>
        <p><span className="text-yellow-400 font-medium">Status:</span> {selectedProject.status}</p>
        <p><span className="text-yellow-400 font-medium">Start:</span> {selectedProject.startDate?.slice(0, 10)}</p>
        <p><span className="text-yellow-400 font-medium">End:</span> {selectedProject.endDate?.slice(0, 10)}</p>
      </div>

      {/* التاسكات */}
      <div>
        <h3 className="text-lg font-semibold text-green-400 mt-6">Project Tasks</h3>
        {projectTasks.length === 0 ? (
          <p className="text-gray-400 text-sm mt-2">لا توجد مهام حالياً لهذا المشروع.</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {projectTasks.map((task, idx) => (
              <li key={idx} className="bg-gray-800 p-3 rounded shadow text-sm text-white">
                <p><span className="text-blue-300">Title:</span> {task.taskName}</p>
                <p><span className="text-purple-300">Description:</span> {task.taskDescription}</p>
                <p><span className="text-yellow-300">Status:</span> {task.taskStatus}</p>
                <p>
                  <span className="text-red-300">Due Date:</span>{" "}
                  {new Date(task.taskDueDate).toISOString().split("T")[0]}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
)}



    {/* الفورم: Add New Project */}
    {showForm && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto space-y-4 relative">
      {/* زر الإغلاق */}
      <button
        onClick={() => setShowForm(false)}
        className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
      >
        ×
      </button>
  
      {/* محتوى الفورم */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const adminName = localStorage.getItem("adminName");
  
          if (
            !title.trim() ||
            !description.trim() ||
            !category.trim() ||
            !startDate ||
            !endDate ||
            !status.trim() ||
            !adminName ||
            selectedStudents.length === 0
          ) {
            alert("يرجى تعبئة جميع الحقول.");
            return;
          }
  
          const projectData = {
            title,
            description,
            category,
            startDate,
            endDate,
            status,
            adminName,
            selectedStudents,
          };
  
          try {
            const response = await fetch("http://localhost:4000/api/add-project", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(projectData),
            });
  
            if (response.ok) {
              alert("تمت إضافة المشروع بنجاح!");
              setTitle("");
              setDescription("");
              setCategory("");
              setStartDate("");
              setEndDate("");
              setStatus("In Progress");
              setSelectedStudents([]);
              setShowForm(false);
            } else {
              alert("فشل في إضافة المشروع.");
            }
          } catch (error) {
            console.error(error);
            alert("حدث خطأ أثناء إضافة المشروع.");
          }
        }}
        className="space-y-4 max-h-[400px] overflow-y-auto"
      >
        {/* Title */}
        <div>
          <label className="block mb-1 text-white text-sm">Project Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
          />
        </div>
  
        {/* Description */}
        <div>
          <label className="block mb-1 text-white text-sm">Project Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
            rows="3"
          ></textarea>
        </div>
  
        {/* Students */}
        <div>
          <label className="block mb-1 text-white text-sm">Students List:</label>
          <select
            multiple
            value={selectedStudents}
            onChange={(e) =>
              setSelectedStudents(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className="w-full h-32 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
          >
            {students.map((student, index) => (
              <option key={index} value={student}>
                {student}
              </option>
            ))}
          </select>
        </div>
  
        {/* Category */}
        <div>
          <label className="block mb-1 text-white text-sm">Project Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
          >
            <option value="">Select a category</option>
            <option>Web Development</option>
            <option>Mobile Development</option>
            <option>Machine Learning</option>
            <option>Data Science</option>
            <option>Artificial Intelligence</option>
          </select>
        </div>
  
        {/* Dates */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block mb-1 text-white text-sm">Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-white text-sm">End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
            />
          </div>
        </div>
  
        {/* Status */}
        <div>
          <label className="block mb-1 text-white text-sm">Project Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
          >
            <option>In Progress</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>On Hold</option>
            <option>Cancelled</option>
          </select>
        </div>
  
        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded text-sm"
          >
            Add Project
          </button>
        </div>
      </form>
    </div>
  </div>
  
    )}
  </div>
)}



          
   { activeSection === "tasks" && (
     <div id="tasks" className="section p-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="sort-tasks" className="font-medium">Sort By:</label>
          <select
            id="sort-tasks"
            value={sortBy}
            onChange={handleSortChange}
            className="border rounded p-1 bg-gray-800 text-white"
          >
            <option value="taskStatus">Task Status</option>
            <option value="projectTitle">Project</option>
            <option value="taskDueDate">Due Date</option>
            <option value="taskAssignee">Assigned Student</option>
          </select>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            🗑️ Delete Task by ID
          </button>
          <button
             onClick={() => {
    console.log("تم الضغط على زر إنشاء مهمة");
    handleCreateClick();
  }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            ➕ Create a New Task
          </button>
        </div>
      </div>

     {/* Table */}
<div className="overflow-x-auto">
  <table className="min-w-full border border-gray-300 text-sm bg-black text-white">
    <thead className="bg-gray-800 text-white">
      <tr>
        <th className="px-4 py-2 border">ID</th>
        <th className="px-4 py-2 border">Project</th>
        <th className="px-4 py-2 border">Name</th>
        <th className="px-4 py-2 border">Description</th>
        <th className="px-4 py-2 border">Student</th>
        <th className="px-4 py-2 border">Status</th>
        <th className="px-4 py-2 border">Due Date</th>
        <th className="px-4 py-2 border">Actions</th>
      </tr>
    </thead>
    <tbody>
      {tasks.map((t) => {
        const status = t.taskStatus?.trim().toLowerCase();
        let statusColor = "text-white";

        if (status === "completed") statusColor = "text-blue-400";
        else if (status === "in progress") statusColor = "text-green-400";
        else if (status === "pending") statusColor = "text-yellow-400";

        console.log("Status raw value:", JSON.stringify(t.taskStatus));

        return (
          <tr key={t.id} className="hover:bg-gray-700">
            <td className="px-4 py-2 border">{t.id}</td>
            <td className="px-4 py-2 border">{t.projectTitle}</td>
            <td className="px-4 py-2 border">{t.taskName}</td>
            <td className="px-4 py-2 border">{t.taskDescription}</td>
            <td className="px-4 py-2 border">{t.taskAssignee}</td>
            <td className={`px-4 py-2 border font-semibold ${statusColor}`}>
              {t.taskStatus}
            </td>
            <td className="px-4 py-2 border">{t.taskDueDate}</td>
            <td className="px-4 py-2 border text-center">
              <button onClick={() => handleEditClick(t)} className="text-blue-400">
                ✏️
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>


 {/* Edit Modal */}
{isEditModalOpen && editTaskData && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-black text-white rounded-lg p-6 w-full max-w-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-400">Edit Task</h2>
        <button
          onClick={() => setIsEditModalOpen(false)}
          className="text-white text-2xl"
        >
          &times;
        </button>
      </div>
      <form onSubmit={handleEditSubmit} className="space-y-4">
       <div>
  <label className="block mb-1">Project Title:</label>
  <select
    className="w-full p-2 bg-gray-800 text-white rounded"
    value={editTaskData.projectTitle || ""}
    onChange={(e) =>
      setEditTaskData({ ...editTaskData, projectTitle: e.target.value })
    }
    required
  >
    {/* إذا القيمة غير موجودة ضمن المشاريع الحالية نعرضها أولاً */}
    {!projects.find((p) => p.title === editTaskData.projectTitle) && (
      <option value={editTaskData.projectTitle}>{editTaskData.projectTitle}</option>
    )}
    <option value="">Select a project</option>
    {projects.map((proj) => (
      <option key={proj.id} value={proj.title}>
        {proj.title}
      </option>
    ))}
  </select>
</div>

        <div>
          <label className="block mb-1">Task Name:</label>
          <input
            className="w-full p-2 bg-gray-800 text-white rounded"
            value={editTaskData.taskName}
            onChange={(e) =>
              setEditTaskData({ ...editTaskData, taskName: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description:</label>
          <textarea
            className="w-full p-2 bg-gray-800 text-white rounded"
            value={editTaskData.taskDescription}
            onChange={(e) =>
              setEditTaskData({
                ...editTaskData,
                taskDescription: e.target.value,
              })
            }
            required
          />
        </div>
        <div>
          <label className="block mb-1">Assigned Student:</label>
          <select
            className="w-full p-2 bg-gray-800 text-white rounded"
            value={editTaskData.taskAssignee}
            onChange={(e) =>
              setEditTaskData({ ...editTaskData, taskAssignee: e.target.value })
            }
            required
          >
            <option value="">Select Student</option>
            {students.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Status:</label>
          <select
            className="w-full p-2 bg-gray-800 text-white rounded"
            value={editTaskData.taskStatus}
            onChange={(e) =>
              setEditTaskData({ ...editTaskData, taskStatus: e.target.value })
            }
            required
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Due Date:</label>
          <input
  className="w-full p-2 bg-gray-800 text-white rounded"
  type="date"
  value={editTaskData.taskDueDate?.substring(0, 10) || ""}
  onChange={(e) =>
    setEditTaskData({ ...editTaskData, taskDueDate: e.target.value })
  }
  required
/>


        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 w-full rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  </div>
)}


      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-black text-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-blue-500">Create New Task</h2>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-white text-2xl">&times;</button>
            </div>
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Project Title:</label>
                <select
                  name="projectTitle"
                  className="w-full p-2 bg-gray-800 text-white rounded"
                  required
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                >
                  <option value="">Select a project</option>
                  {projects.map((proj) => (
                    <option key={proj.id} value={proj.title}>{proj.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1">Task Name:</label>
                <input name="taskName" className="w-full p-2 bg-gray-800 text-white rounded" required />
              </div>
              <div>
                <label className="block mb-1">Description:</label>
                <textarea name="taskDescription" className="w-full p-2 bg-gray-800 text-white rounded" required />
              </div>
              <div>
  <label className="block mb-1 text-sm text-gray-300">Assigned Student:</label>
  <select
    name="taskAssignee"
    className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  >
    <option value="">Select Student</option>
    {Array.isArray(projectStudents) &&
      projectStudents.map((student) => (
        <option key={student.studentUsername} value={student.studentUsername}>
          {student.studentUsername}
        </option>
      ))}
  </select>
</div>

              <div>
               
                <label className="block mb-1">Status:</label>
                <select name="taskStatus" className="w-full p-2 bg-gray-800 text-white rounded" required>
                  <option value="">Select a status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Due Date:</label>
<input
  type="date"
  name="taskDueDate"
  min={new Date().toISOString().split("T")[0]}  // 🔥 هذا يمنع التاريخ القديم
  className="w-full p-2 bg-gray-800 text-white rounded"
  required
/>
              </div>
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 w-full rounded">
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
    )}

          
                {activeSection === "chat" && (
                  <div id="chat" className="section s123 flex">
                    {/* by batool */}
                  {/* Sidebar */}
                  <div className="sidebar1 bg-[#222] p-4 w-1/4 text-white">
                    <h3 className="text-lg font-bold mb-2">Student List</h3>
                    <div className="user-list space-y-2">
                    {students.map((student, index) => (
  <div
    key={index}
    onClick={() => setSelectedUser(student)}
    className={`cursor-pointer p-2 rounded ${
      selectedUser === student ? "bg-blue-600" : "bg-gray-700"
    } hover:bg-blue-500`}
  >
    {student}
  </div>
))}

                    </div>
                  </div>
            
                  {/* Chat container */}
                  <div className="chat-container bg-[#111] p-4 w-3/4 text-white flex flex-col">
                    <div className="chat-box flex-1 overflow-y-auto mb-4">
                      <h3 id="chatWith" className="text-lg font-semibold mb-2">
                        {selectedUser
                          ? `Chatting with: ${selectedUser}`
                          : "Select a student to chat with.."}
                      </h3>
                      <div className="messages space-y-2 p-2 bg-gray-800 rounded h-64 overflow-y-auto">
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`p-2 rounded max-w-xs ${
        msg.sender === currentUser ? "bg-blue-500 text-white ml-auto" : "bg-gray-600 text-white mr-auto"
      }`}
    >
      {msg.message}
    </div>
  ))}
</div>
                    </div>
            
                    {/* Input area */}
                    <div className="input-area flex">
                      <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Write your message..."
                        className="flex-1 p-2 rounded-l bg-gray-700 text-white placeholder-gray-400 outline-none"
                      />
                      <button
                        onClick={sendMessage}
                        className="bg-blue-600 px-4 rounded-r hover:bg-blue-700"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
                )}
              </div>
            </div>
          
        ) : (
          <div className="flex bg-gray-900 h-screen bg-[#111] text-white">
              
          {/* Sidebar */}
          <div className="w-64  bg-[#1a1a1a] p-4 flex flex-col gap-4">
            {["home", "projects", "tasks", "chat"].map((section) => (
              <button
                key={section}
                onClick={() => showSection(section)}
                className={`text-left px-4 bg-gray-700 py-2 rounded ${
                  activeSection === section
                    ? "bg-blue-600 font-bold"
                    : "bg-[#3a3a3a] hover:bg-[#4a4a4a]"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
      
          {/* Main content */}
          <div className="flex-1 p-8 overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-blue-500">Welcome to the Task Management System</h1>
              <div>
              <p className="text-sm">
  {currentTime.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })}
</p>
                <p className="text-right  font-semibold"> Student {localStorage.getItem("studentName")}</p>
                </div>
              <button
                onClick={handleLogoutstu}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded ml-4"
              >
                Logout
              </button>
            </div>
      
            {activeSection === "home" && (
              <>
              {/* by batool */}
                {/* Overview Cards */}
                <div className="grid grid-cols-4 gap-4 mb-6 ml-20">
                {[
                    { title: "Number of Tasks", key: "numberOfTasks" },
                    { title: "Number of Finished Projects", key: "numberOfFinishedProjects" },
                  ].map((item) => (
                    <div key={item.key} className="bg-[#222] p-4 rounded  bg-gray-700 shadow text-center">
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-2xl text-white mt-2">{localStorage.getItem(item.key)}</p>
                    </div>
                  ))}
                </div>
      
                {/* Placeholder Chart */}
                <div className="bg-[#1a1a1a] p-4 rounded h-64">
<ResponsiveContainer width="100%" height="100%">
  <BarChart data={data1}>
    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
    <XAxis dataKey="name" stroke="#aaa" />
    <YAxis stroke="#aaa" />
    <Tooltip
      contentStyle={{ backgroundColor: '#333', border: 'none' }}
      cursor={{ fill: 'transparent' }}
    />
    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
      {data1.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
      ))}
    </Bar>
  </BarChart>
</ResponsiveContainer>
</div>
              </>
            )}
      
      
      {activeSection === "projects" && userType === 'Student' && (
  <div className="space-y-6">
    {/* العنوان في صف لحاله */}
    <div>
      <h2 className="text-xl font-semibold text-blue-500">Your Projects</h2>
    </div>

    {/* الكروت: Projects List */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.length === 0 ? (
        <p className="text-center text-red-500">No Projects Available</p>
      ) : (
        projects.map((project, index) => (
          <div key={index} className="bg-gray-800 border border-gray-700 p-5 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-blue-400 mb-2">{project.title}</h3>
            <p className="text-sm text-gray-300 mb-1">{project.description}</p>
            <p className="text-sm text-yellow-300">Category: {project.category}</p>
            <p className="text-sm text-green-300">Status: {project.status}</p>
            {/* Progress Bar حسب التواريخ */}
            {project.startDate && project.endDate && (
              (() => {
                const start = new Date(project.startDate);
                const end = new Date(project.endDate);
                const today = new Date();

                const totalDuration = end - start;
                const elapsed = today - start;
                const progress = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);

                return (
                  <div className="mt-3">
                    <p className="text-sm text-white mb-1">Progress: {progress.toFixed(0)}%</p>

                    <div className="w-full h-3 bg-gray-600 rounded-full">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-300 mt-1">
                      <span>{project.startDate?.slice(0, 10)}</span>
                      <span>{project.endDate?.slice(0, 10)}</span>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        ))
      )}
    </div>

  </div>
)}




      
            {activeSection === "tasks" && (
              
<div className="p-6 bg-black text-white min-h-screen">
      <h2 className="text-xl font-bold mb-4 text-blue-400">My Tasks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tasks.map((task) => {
          let statusColor = "";
          const status = task.taskStatus?.trim().toLowerCase();

          if (status === "completed") statusColor = "text-blue-400";
          else if (status === "in progress") statusColor = "text-green-400";
          else if (status === "pending") statusColor = "text-yellow-400";

          return (
            <div key={task.id} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-bold">{task.taskName}</h3>
              <p><strong>Project:</strong> {task.projectTitle}</p>
              <p><strong>Description:</strong> {task.taskDescription}</p>
              <p><strong>Status:</strong> <span className={statusColor}>{task.taskStatus}</span></p>
              <p><strong>Due Date:</strong> {task.taskDueDate?.substring(0, 10)}</p>
            </div>
          );
        })}
      </div>
    </div>
            )}
      
            {activeSection === "chat" && (
             <div id="chat" className="section s123 flex">
             {/* Sidebar */}
             {/* by batool */}
             <div className="sidebar1 bg-[#222] p-4 w-1/4 text-white">
               <h3 className="text-lg font-bold mb-2">Admins List</h3>
               <div className="user-list space-y-2">
                 {admins.map((admin, index) => (
                  <div
                  key={index}
                  onClick={() => setSelectedUser(admin)}
                  className={`cursor-pointer p-2 rounded ${
                    selectedUser === admin ? "bg-blue-600" : "bg-gray-700"
                  } hover:bg-blue-500`}
                >
                  {admin}
                </div>
                 ))}
               </div>
             </div>
       
             {/* Chat container */}
             <div className="chat-container bg-[#111] p-4 w-3/4 text-white flex flex-col">
               <div className="chat-box flex-1 overflow-y-auto mb-4">
                 <h3 id="chatWith" className="text-lg font-semibold mb-2">
                   {selectedUser
                     ? `Chatting with: ${selectedUser}`
                     : "Select a student to chat with.."}
                 </h3>
                 <div className="messages space-y-2 p-2 bg-gray-800 rounded h-64 overflow-y-auto">
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`p-2 rounded max-w-xs ${
        msg.sender === currentUser ? "bg-blue-500 text-white ml-auto" : "bg-gray-600 text-white mr-auto"
      }`}
    >
      {msg.message}
    </div>
  ))}
</div>
               </div>
       
               {/* Input area */}
               <div className="input-area flex">
                 <input
                   type="text"
                   value={messageInput}
                   onChange={(e) => setMessageInput(e.target.value)}
                   placeholder="Write your message..."
                   className="flex-1 p-2 rounded-l bg-gray-700 text-white placeholder-gray-400 outline-none"
                 />
                 <button
                   onClick={sendMessage}
                   className="bg-blue-600 px-4 rounded-r hover:bg-blue-700"
                 >
                   Send
                 </button>
               </div>
             </div>
           </div>
       
            )}
          </div>
        </div>
        )
      ) : (
        isSignUp ? 
          <SignUp switchToSignIn={switchToSignIn} onSignUpSuccess={onSignUpSuccess} /> 
          : 
          <SignIn switchToSignUp={switchToSignUp} onSignInSuccess={onSignInSuccess} />
      )}
    </div>
  );

};

export default App;
