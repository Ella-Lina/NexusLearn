const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "nexuslearn.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  }
  console.log("Connected to SQLite database.");

  db.serialize(() => {
    db.run(`
  CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    instructor TEXT NOT NULL,
    duration TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL
  )
`);

    db.run(`
      CREATE TABLE IF NOT EXISTS instructors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        bio TEXT NOT NULL,
        email TEXT NOT NULL,
        image TEXT NOT NULL
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        date TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT NOT NULL
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS faqs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT NOT NULL,
        answer TEXT NOT NULL
      )
    `);

    db.run(
      `
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        query TEXT NOT NULL,
        submitted_at TEXT NOT NULL
      )
    `,
      (err) => {
        if (err) {
          console.error("Error creating messages table:", err.message);
        } else {
          console.log("Messages table created or already exists.");
        }
      }
    );

    db.get("SELECT COUNT(*) as count FROM courses", (err, row) => {
      if (err) console.error("Error checking courses table:", err);
      if (row.count === 0) {
        const courses = [
          [
            "Web Development Fundamentals",
            "Dr. Alice Smith",
            "8 weeks",
            "Learn HTML, CSS, and JavaScript.",
            "/images/courses/webdev.jpg",
          ],
          [
            "Data Science with Python",
            "Prof. Marcus Lin",
            "10 weeks",
            "Master data analysis with Python.",
            "/images/courses/python.jpg",
          ],
          [
            "Mobile App Development",
            "Ms. Clara Lee",
            "12 weeks",
            "Build apps with React Native.",
            "/images/courses/mobile.jpg",
          ],
          [
            "JavaScript Essentials",
            "Jane Doe",
            "6 weeks",
            "Learn the fundamentals of JavaScript including syntax, loops, and DOM manipulation.",
            "/images/courses/javascript.jpg",
          ],
          [
            "Data Analysis with Excel",
            "Kevin White",
            "3 weeks",
            "Master formulas, pivot tables, and data visualization using Excel.",
            "/images/courses/excel.jpg",
          ],
          [
            "Cybersecurity Basics",
            "Mia Lin",
            "7 weeks",
            "Understand the core principles of securing systems, data, and networks.",
            "/images/courses/cybersecurity.jpg",
          ],
          [
            "Full Stack JavaScript",
            "Nina Zhang",
            "10 weeks",
            "Go beyond the basics with Node.js, Express, MongoDB, and frontend frameworks.",
            "/images/courses/fullstack.jpg",
          ],
          [
            "UI/UX Design Principles",
            "Emily Rivera",
            "6 weeks",
            "Design intuitive and user-friendly interfaces using tools like Figma and Adobe XD.",
            "/images/courses/uiux.jpg",
          ],
        ];
        const stmt = db.prepare(
          "INSERT INTO courses (name, instructor, duration, description, image) VALUES (?, ?, ?, ?, ?)"
        );
        courses.forEach((course) => stmt.run(course));
        stmt.finalize();
      }
    });

    db.get("SELECT COUNT(*) as count FROM instructors", (err, row) => {
      if (err) console.error("Error checking instructors table:", err);
      if (row.count === 0) {
        const instructors = [
          [
            "Dr. Alice Smith",
            "Expert in web technologies.",
            "alice@nexuslearn.com",
            "/images/instructors/alice.jpg",
          ],
          [
            "Prof. Marcus Lin",
            "Data science guru with 20 years experience.",
            "marcus@nexuslearn.com",
            "/images/instructors/marcus.jpg",
          ],
          [
            "Ms. Clara Lee",
            "Mobile app specialist.",
            "clara@nexuslearn.com",
            "/images/instructors/clara.jpg",
          ],
          [
            "Jane Doe",
            "Front-end developer and JavaScript enthusiast.",
            "jane@nexuslearn.com",
            "/images/instructors/jane.jpg",
          ],
          [
            "Kevin White",
            "Excel power user and corporate trainer.",
            "kevin@nexuslearn.com",
            "/images/instructors/kevin.jpg",
          ],
          [
            "Mia Lin",
            "Cybersecurity analyst with hands-on experience.",
            "mia@nexuslearn.com",
            "/images/instructors/mia.jpg",
          ],
          [
            "Nina Zhang",
            "Full-stack JS expert with startup experience.",
            "nina@nexuslearn.com",
            "/images/instructors/nina.jpg",
          ],
          [
            "Emily Rivera",
            "UX/UI designer passionate about usability.",
            "emily@nexuslearn.com",
            "/images/instructors/emily.jpg",
          ],
        ];
        const stmt = db.prepare(
          "INSERT INTO instructors (name, bio, email, image) VALUES (?, ?, ?, ?)"
        );
        instructors.forEach((instructor) => stmt.run(instructor));
        stmt.finalize();
      }
    });

    db.get("SELECT COUNT(*) as count FROM events", (err, row) => {
      if (err) console.error("Error checking events table:", err);
      if (row.count === 0) {
        const events = [
          [
            "Live Q&A",
            "2025-05-01",
            "Q&A",
            "Ask questions live with instructors.",
            "/images/events/qa.jpg",
          ],
          [
            "Guest Lecture",
            "2025-06-15",
            "Lecture",
            "Learn from industry experts.",
            "/images/events/lecture.jpg",
          ],
          [
            "Concert: Tech Tunes",
            "2024-12-20",
            "Concert",
            "Enjoy tech-inspired music.",
            "/images/events/concert.jpg",
          ],
          [
            "Coding Workshop",
            "2025-05-20",
            "Workshop",
            "Hands-on coding session for beginners.",
            "/images/events/workshop.jpg",
          ],
          [
            "Tech Trivia Night",
            "2025-07-10",
            "Trivia",
            "Test your tech knowledge with fun trivia.",
            "/images/events/trivia.jpg",
          ],
          [
            "Hackathon 2024",
            "2024-11-15",
            "Hackathon",
            "Compete in a 24-hour coding challenge.",
            "/images/events/hackathon.jpg",
          ],
          [
            "AI Seminar",
            "2025-08-01",
            "Seminar",
            "Learn about artificial intelligence trends.",
            "/images/events/ai.jpg",
          ],
          [
            "Summer Concert Series",
            "2025-07-15",
            "Concert",
            "Outdoor music event.",
            "/images/events/summerconcert.jpg",
          ],
          [
            "Winter Coding Camp",
            "2023-12-10",
            "Workshop",
            "Coding for all ages.",
            "/images/events/wintercamp.jpg",
          ],
          [
            "New Year’s Tech Party",
            "2024-01-01",
            "Concert",
            "Celebrate with tech demos.",
            "/images/events/newyear.jpg",
          ],
          [
            "Christmas Tech Fest",
            "2024-12-24",
            "Christmas",
            "A festive tech showcase with holiday cheer!",
            "/images/events/christmas.jpg",
          ],
        ];

        const stmt = db.prepare(
          "INSERT INTO events (title, date, category, description, image) VALUES (?, ?, ?, ?, ?)"
        );
        events.forEach((event) => stmt.run(event));
        stmt.finalize();
      }
    });

    db.get("SELECT COUNT(*) as count FROM faqs", (err, row) => {
      if (err) console.error("Error checking faqs table:", err);
      if (row.count === 0) {
        const faqs = [
          [
            "How do I enroll in a course?",
            'Visit the Courses page, select a course, and click "Enroll Now".',
          ],
          [
            "Are the courses free?",
            "We offer both free and paid courses. Check the course details for pricing.",
          ],
          [
            "Can I contact instructors?",
            "Yes, instructor contact details are on the Instructors page.",
          ],
          [
            "What is the duration of each course?",
            "Each course displays its duration clearly, ranging from 3 to 12 weeks.",
          ],
          [
            "Do I get a certificate after completing a course?",
            "Yes! Most of our courses offer a digital certificate upon completion.",
          ],
          [
            "Can I access the courses on mobile?",
            "Absolutely. NexusLearn is optimized for mobile and desktop devices.",
          ],
          [
            "Are there any live sessions?",
            "Yes, some courses offer live Q&A or webinars with instructors.",
          ],
        ];
        const stmt = db.prepare(
          "INSERT INTO faqs (question, answer) VALUES (?, ?)"
        );
        faqs.forEach((faq) => stmt.run(faq));
        stmt.finalize();
      }
    });
  });
});

const dbService = {
  getCourses: (callback) => {
    const sql = `
    SELECT courses.*, instructors.image AS instructorImage
    FROM courses
    JOIN instructors ON courses.instructor = instructors.name
  `;
    db.all(sql, [], (err, rows) => {
      callback(err, rows);
    });
  },

  searchCourses: (query, callback) => {
    const sql = "SELECT * FROM courses WHERE name LIKE ?";
    db.all(sql, [`%${query}%`], (err, rows) => {
      callback(err, rows);
    });
  },

  getInstructors: (callback) => {
    db.all("SELECT * FROM instructors", [], (err, rows) => {
      callback(err, rows);
    });
  },

  getEvents: (callback) => {
    db.all("SELECT * FROM events", [], (err, rows) => {
      callback(err, rows);
    });
  },

  getEventById: (id, callback) => {
    db.get("SELECT * FROM events WHERE id = ?", [id], (err, row) => {
      callback(err, row);
    });
  },

  filterEvents: (year, category, callback) => {
    let sql = "SELECT * FROM events WHERE 1=1";
    const params = [];
    if (year) {
      sql += " AND date LIKE ?";
      params.push(`${year}%`);
    }
    if (category) {
      sql += " AND category = ?";
      params.push(category);
    }
    db.all(sql, params, (err, rows) => {
      callback(err, rows);
    });
  },

  getFAQs: (callback) => {
    db.all("SELECT * FROM faqs", [], (err, rows) => {
      callback(err, rows);
    });
  },

  saveMessage(
    messageData,
    callback = (err) => {
      if (err) console.error("Error saving message:", err);
    }
  ) {
    const { name, email, message } = messageData;
    const query = message;
    const submitted_at = new Date().toISOString();
    console.log("Saving message to database:", {
      name,
      email,
      query,
      submitted_at,
    });
    db.run(
      "INSERT INTO messages (name, email, query, submitted_at) VALUES (?, ?, ?, ?)",
      [name, email, query, submitted_at],
      function (err) {
        if (err) {
          console.error("Database insert error:", err.message);
        } else {
          console.log("Message saved with ID:", this.lastID);
        }
        callback(err);
      }
    );
  },
};

module.exports = { dbService, db };
