import api from "./apiHandler";

export async function fetch(setItems) {
  const res = await api.get("/notes");
  if (res.data.success) {
    setItems(res.data.result);
  }
}

export async function checkAuth() {
  try {
    const res = await api.get("/notes");
    return res.data.success;
  } catch (err) {
    return false;
  }    
}

export async function deleteItem(id) {
  const res = await api.delete(`/notes/${id}`);
  console.log(res);
  await fetch();
}

export async function addItem(item) {
  const res = await api.post("/notes/create", {
    title: item.title,
    content: item.content,
    color: item.color,
  });
  console.log(res);
  await fetch();
}


