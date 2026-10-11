/* ==========================================================================
   forms.js — validates forms and opens a pre-filled WhatsApp message.
   Nothing is stored on a server; the school receives the message only
   when the visitor presses "Send" inside WhatsApp.

   Markup:  <form data-form="contact"> ... </form>
            <div data-form-done="contact" hidden> ... </div>
   To add a form: add its rules to FORMS below.
   ========================================================================== */
(function () {
  const { whatsappUrl } = window.UI;
  const val = (v) => (v || "").trim();

  // Each rule returns an error message, or "" when the value is fine.
  const required = (msg, max) => (v) => (!val(v) ? msg : val(v).length > max ? `Maximum ${max} characters` : "");
  const optional = (max) => (v) => (val(v).length > max ? `Maximum ${max} characters` : "");
  const email = (v) => (val(v) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val(v)) ? "Enter a valid email" : "");
  const phone = (v) => (/^[0-9+\s-]{10,15}$/.test(val(v)) ? "" : "Enter a valid phone number");

  const FORMS = {
    contact: {
      rules: {
        name: required("Name is required", 100),
        phone: optional(20),
        email,
        message: required("Message is required", 1000),
      },
      message: (d) =>
        `School contact message\nName: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email}\nMessage: ${d.message}`,
    },
    admission: {
      rules: {
        student_name: required("Student name is required", 100),
        parent_name: required("Parent name is required", 100),
        class_applying: (v) => (val(v) ? "" : "Please select a class"),
        phone,
        message: optional(1000),
      },
      message: (d) =>
        `Admission inquiry\nStudent: ${d.student_name}\nParent: ${d.parent_name}\nClass: ${d.class_applying}\nPhone: ${d.phone}\nMessage: ${d.message}`,
    },
  };

  document.querySelectorAll("form[data-form]").forEach((form) => {
    const cfg = FORMS[form.dataset.form];
    const done = document.querySelector(`[data-form-done="${form.dataset.form}"]`);
    if (!cfg) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      let ok = true;
      Object.keys(cfg.rules).forEach((name) => {
        const msg = cfg.rules[name](data[name]);
        const box = form.querySelector(`[data-error="${name}"]`);
        if (box) box.textContent = msg;
        if (msg) ok = false;
      });
      if (!ok) return;

      const clean = Object.fromEntries(Object.entries(data).map(([k, v]) => [k, val(v)]));
      window.open(whatsappUrl(cfg.message(clean)), "_blank", "noopener,noreferrer");
      form.hidden = true;
      if (done) done.hidden = false;
    });

    // "Send another" button inside the success box
    done?.querySelector("button")?.addEventListener("click", () => {
      form.reset();
      done.hidden = true;
      form.hidden = false;
    });
  });
})();
