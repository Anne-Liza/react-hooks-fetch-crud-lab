import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";  // Component for adding a new question
import QuestionList from "./QuestionList";  // Component for listing all questions

function AdminPanel() {
  const [page, setPage] = useState("List");

  function handleChangePage(page) {
    setPage(page);
  }

  return (
    <div>
      <AdminNavBar onChangePage={handleChangePage} />
      {page === "Form" && <QuestionForm />}
      {page === "List" && <QuestionList />}
    </div>
  );
}

export default AdminPanel;
