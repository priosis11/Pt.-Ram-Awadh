/* ==========================================================================
   config.js — ALL editable school content lives here.
   Edit text, phone, toppers, teachers, notices, blog posts, gallery photos
   in this file and every page updates automatically.
   ========================================================================== */

/* --------------------------------------------------------------------------
   GALLERY PHOTOS — how they work
   Every gallery category has its own folder with numbered files:

     assets/images/gallery/campus/      campus-01.jpg    campus-02.jpg   ...
     assets/images/gallery/classrooms/  classroom-01.jpg classroom-02.jpg ...
     assets/images/gallery/events/      event-01.jpg     event-02.jpg    ...
     assets/images/gallery/bus/         bus-01.jpg       bus-02.jpg      ...

   * The gallery shows ONLY the photos that really exist in these folders.
     Missing numbers are skipped automatically, so there are no empty tiles.
   * To add a photo: save it in the right folder as the NEXT number
     (for example campus-02.jpg). It appears on the website by itself.
     Use .jpg files (rename or convert other formats to .jpg).
   * To remove a photo: delete the file.
   * The website looks for numbers 01 up to the count in PHOTO_COUNTS below
     (campus 8, classrooms 12, events 16, bus 8). Need more? Increase that number.
   * Right now photo 01 of each category is a real school photo and the rest
     are plain WHITE placeholders. To replace one, save your photo with the SAME
     file name (for example classroom-05.jpg) and it shows up automatically.
   -------------------------------------------------------------------------- */
// How many photo slots each category has. To allow more photos in a category,
// increase its number (and save the new files with the next numbers).
//   campus: 8   classrooms: 12   events: 16   bus: 8
const PHOTO_COUNTS = { campus: 8, classrooms: 12, events: 16, bus: 8 };

/** Builds the list of photo entries for one gallery category. */
function gallerySlots(category, folder, prefix, label) {
  const slots = [];
  for (let n = 1; n <= PHOTO_COUNTS[folder]; n++) {
    const num = String(n).padStart(2, "0"); // 1 -> "01"
    slots.push({
      src: `assets/images/gallery/${folder}/${prefix}-${num}.jpg`,
      category: category,
      alt: `${label} ${n}`,
    });
  }
  return slots;
}

window.SITE = {
  school: {
    name: "Pt. Ram Awadh Bal Vidya Mandir",
    short: "PRABVM",
    tagline: "Education, Values and Success",
    board: "UP Board",
    classes: "Classes 1-12",
    principal: "Priyanka",
    address: "Masena Mirzapur, Ramnagar, Ambedkar Nagar, Uttar Pradesh, India",
    phone: "+91 9972668406",
    phoneRaw: "919972668406",
    email: "info@pramvidyamandir.in",
    mapQuery: "Masena Mirzapur, Ramnagar, Ambedkar Nagar, Uttar Pradesh",
    social: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
    },
  },

  // Menu links (the "Contact Us" button is added automatically)
  nav: [
    { href: "index.html", label: "Home", page: "home" },
    { href: "gallery.html", label: "Gallery", page: "gallery" },
    { href: "about.html", label: "About", page: "about" },
    { href: "admission.html", label: "Admission", page: "admission" },
    { href: "services.html", label: "Services", page: "services" },
    { href: "blog.html", label: "Blog", page: "blog" },
  ],

  // TOPPERS (home page). Each topper has a photo path. To use a real photo, save it
  // in assets/images/toppers/ with that file name (topper-01.jpg = first person in
  // this list, topper-02.jpg = second, ...). Portrait (3:4) photos look best.
  // Right now every topper photo is a plain WHITE placeholder - replace it with the real photo (same file name).
  // If a photo file is deleted, the website shows a drawn student figure instead.
  // There are 12 topper slots (topper-01.jpg ... topper-12.jpg). Photos 01-12 are white
  // placeholders for now - replace a photo by saving yours with the SAME file name.
  // Entries 07-12 are placeholder text: edit the name, class and score.
  // To add more: add a new line here and its photo, e.g. topper-13.jpg.
  toppers: [
    { name: "Ankit Yadav", cls: "Class 12", score: "94.6%", gender: "boy", photo: "assets/images/toppers/topper-01.jpg" },
    { name: "Shivani Verma", cls: "Class 12", score: "93.8%", gender: "girl", photo: "assets/images/toppers/topper-02.jpg" },
    { name: "Rohit Maurya", cls: "Class 10", score: "95.2%", gender: "boy", photo: "assets/images/toppers/topper-03.jpg" },
    { name: "Pooja Singh", cls: "Class 10", score: "94.0%", gender: "girl", photo: "assets/images/toppers/topper-04.jpg" },
    { name: "Aman Gupta", cls: "Class 10", score: "92.4%", gender: "boy", photo: "assets/images/toppers/topper-05.jpg" },
    { name: "Kajal Nishad", cls: "Class 12", score: "91.9%", gender: "girl", photo: "assets/images/toppers/topper-06.jpg" },
    // ---- 07 to 12: PLACEHOLDERS. Replace the name, class and score with real details ----
    { name: "Topper Name 07", cls: "Class 10", score: "00.0%", gender: "boy", photo: "assets/images/toppers/topper-07.jpg" },
    { name: "Topper Name 08", cls: "Class 10", score: "00.0%", gender: "girl", photo: "assets/images/toppers/topper-08.jpg" },
    { name: "Topper Name 09", cls: "Class 10", score: "00.0%", gender: "boy", photo: "assets/images/toppers/topper-09.jpg" },
    { name: "Topper Name 10", cls: "Class 10", score: "00.0%", gender: "girl", photo: "assets/images/toppers/topper-10.jpg" },
    { name: "Topper Name 11", cls: "Class 10", score: "00.0%", gender: "boy", photo: "assets/images/toppers/topper-11.jpg" },
    { name: "Topper Name 12", cls: "Class 10", score: "00.0%", gender: "girl", photo: "assets/images/toppers/topper-12.jpg" },
  ],

  // TEACHERS (About page). Same idea: teacher-01.jpg = first teacher in this list.
  // Save photos in assets/images/teachers/ with these file names (square photos
  // look best). Right now every teacher photo is a plain WHITE placeholder - replace it (same file name).
  // If a photo file is deleted, the website shows the teacher's initials instead.
  teachers: [
    { name: "Ramesh Kumar Tiwari", subject: "Mathematics", qual: "M.Sc., B.Ed.", photo: "assets/images/teachers/teacher-01.jpg" },
    { name: "Sunita Devi", subject: "Hindi", qual: "M.A., B.Ed.", photo: "assets/images/teachers/teacher-02.jpg" },
    { name: "Arvind Pandey", subject: "Physics", qual: "M.Sc., B.Ed.", photo: "assets/images/teachers/teacher-03.jpg" },
    { name: "Neha Srivastava", subject: "English", qual: "M.A., B.Ed.", photo: "assets/images/teachers/teacher-04.jpg" },
    { name: "Manoj Yadav", subject: "Chemistry", qual: "M.Sc., B.Ed.", photo: "assets/images/teachers/teacher-05.jpg" },
    { name: "Kavita Mishra", subject: "Biology", qual: "M.Sc., B.Ed.", photo: "assets/images/teachers/teacher-06.jpg" },
    { name: "Suresh Chandra", subject: "Social Science", qual: "M.A., B.Ed.", photo: "assets/images/teachers/teacher-07.jpg" },
    { name: "Anjali Gupta", subject: "Computer Science", qual: "MCA, B.Ed.", photo: "assets/images/teachers/teacher-08.jpg" },
    // ---- 09 to 24: PLACEHOLDERS. Replace the name, subject and qualification with real details ----
    { name: "Teacher Name 09", subject: "Subject", qual: "Qualification", photo: "assets/images/teachers/teacher-09.jpg" },
    { name: "Teacher Name 10", subject: "Subject", qual: "Qualification", photo: "assets/images/teachers/teacher-10.jpg" },
    { name: "Teacher Name 11", subject: "Subject", qual: "Qualification", photo: "assets/images/teachers/teacher-11.jpg" },
    { name: "Teacher Name 12", subject: "Subject", qual: "Qualification", photo: "assets/images/teachers/teacher-12.jpg" },
    { name: "Teacher Name 13", subject: "Subject", qual: "Qualification", photo: "assets/images/teachers/teacher-13.jpg" },
    { name: "Teacher Name 14", subject: "Subject", qual: "Qualification", photo: "assets/images/teachers/teacher-14.jpg" },
    { name: "Teacher Name 15", subject: "Subject", qual: "Qualification", photo: "assets/images/teachers/teacher-15.jpg" },
    { name: "Teacher Name 16", subject: "Subject", qual: "Qualification", photo: "assets/images/teachers/teacher-16.jpg" },
    { name: "Teacher Name 17", subject: "Subject", qual: "Qualification", photo: "assets/images/teachers/teacher-17.jpg" },
    { name: "Teacher Name 18", subject: "Subject", qual: "Qualification", photo: "assets/images/teachers/teacher-18.jpg" },
    { name: "Teacher Name 19", subject: "Subject", qual: "Qualification", photo: "assets/images/teachers/teacher-19.jpg" },
    { name: "Teacher Name 20", subject: "Subject", qual: "Qualification", photo: "assets/images/teachers/teacher-20.jpg" },
    { name: "Teacher Name 21", subject: "Subject", qual: "Qualification", photo: "assets/images/teachers/teacher-21.jpg" },
    { name: "Teacher Name 22", subject: "Subject", qual: "Qualification", photo: "assets/images/teachers/teacher-22.jpg" },
    { name: "Teacher Name 23", subject: "Subject", qual: "Qualification", photo: "assets/images/teachers/teacher-23.jpg" },
    { name: "Teacher Name 24", subject: "Subject", qual: "Qualification", photo: "assets/images/teachers/teacher-24.jpg" },
  ],

  // Latest notices on the home page (newest first). Dates: YYYY-MM-DD
  notices: [
    { title: "Admissions open for session 2026-27", body: "Admission forms for Classes 1 to 12 are available at the school office.", date: "2026-10-01" },
    { title: "Half-yearly examinations schedule", body: "Half-yearly exams begin from 2 November. Timetable available on the notice board.", date: "2026-09-28" },
    { title: "Parent-Teacher Meeting", body: "PTM for all classes will be held on Saturday, 17 October at 10:00 AM.", date: "2026-09-24" },
    { title: "Diwali holidays", body: "School will remain closed from 30 October to 3 November for Diwali.", date: "2026-09-20" },
  ],

  // Blog posts. "image" is optional — leave "" to use a default school photo.
  // Separate paragraphs with a blank line (\n\n).
  posts: [
    {
      slug: "annual-sports-day-2026",
      title: "Annual Sports Day 2026 Celebrated with Energy",
      excerpt: "Students showed great spirit in races, kho-kho, kabaddi and relay events on our big campus ground.",
      date: "2026-09-15",
      image: "",
      content: "Our Annual Sports Day was held on the school ground with enthusiastic participation from Classes 1 to 12.\n\nStudents competed in races, relay, kho-kho, kabaddi and long jump. Parents joined to cheer for their children, and winners were awarded medals and certificates by Principal Priyanka.\n\nWe thank all teachers and staff for organising a safe and joyful event.",
    },
    {
      slug: "science-exhibition",
      title: "Young Scientists Shine at Science Exhibition",
      excerpt: "Students presented working models on solar energy, water conservation and farming technology.",
      date: "2026-08-22",
      image: "",
      content: "Our Science Exhibition gave students a chance to turn classroom learning into real projects.\n\nModels on solar energy, rain-water harvesting, smart irrigation and waste management were appreciated by visitors and judges.\n\nWe encourage every student to stay curious and keep experimenting.",
    },
    {
      slug: "up-board-results-2026",
      title: "Proud Moment: Excellent UP Board Results",
      excerpt: "Our Class 10 and Class 12 students achieved outstanding results in the UP Board examinations.",
      date: "2026-06-10",
      image: "",
      content: "We are proud to share that our students have once again performed excellently in the UP Board examinations.\n\nMany students scored above 85%, and our toppers have made the school and their families proud. This success reflects the hard work of our students and the dedication of our teachers.\n\nCongratulations to every student!",
    },
  ],

  // Gallery photos — built from the numbered files described above.
  // The category names must match the entries in "photoCategories" below.
  photos: [
    ...gallerySlots("Campus", "campus", "campus", "Campus photo"),
    ...gallerySlots("Classrooms", "classrooms", "classroom", "Classroom photo"),
    ...gallerySlots("Events", "events", "event", "Event photo"),
    ...gallerySlots("Bus", "bus", "bus", "School bus photo"),
  ],
  // Filter buttons shown above the gallery (keep "All" first)
  photoCategories: ["All", "Campus", "Classrooms", "Events", "Bus"],

  // Default blog images (used when a post has no image) — same order as the original site
  fallbackImages: [
    "assets/images/site/event.jpg",
    "assets/images/site/classroom.jpg",
    "assets/images/site/hero-campus.jpg",
    "assets/images/site/bus.jpg",
  ],
};
