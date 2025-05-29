// src/pages/FormPage.tsx
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001/posts";

type Post = {
  id: number;
  title: string;
  content: string;
};

export default function FormPage() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const res = await axios.get(API_URL);
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post(API_URL, formData);
    setFormData({ title: "", content: "" });
    fetchPosts();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Nuevo Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          name="content"
          placeholder="Contenido"
          value={formData.content}
          onChange={handleChange}
        />
        <button type="submit">Guardar</button>
      </form>

      <h2>Posts</h2>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong>: {p.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
