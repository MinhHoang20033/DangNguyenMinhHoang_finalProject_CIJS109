export const getProjects = () =>
  JSON.parse(localStorage.getItem("projects")) || [];

export const saveProjects = (data) =>
  localStorage.setItem("projects", JSON.stringify(data));

export const getEmployees = () =>
  JSON.parse(localStorage.getItem("employees")) || [];

export const saveEmployees = (data) =>
  localStorage.setItem("employees", JSON.stringify(data));