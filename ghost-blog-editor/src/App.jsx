import { useState } from "react";
import PostList from "./components/PostList";
import PostEditor from "./components/PostEditor";

export default function App() {
  const [currentView, setCurrentView] = useState("list");
  const [editingPostId, setEditingPostId] = useState(null);

  const handleEditPost = (postId) => {
    setEditingPostId(postId);
    setCurrentView("editor");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setEditingPostId(null);
  };

  return (
    <>
      {currentView === "list" && <PostList onEdit={handleEditPost} />}
      {currentView === "editor" && editingPostId && (
        <PostEditor postId={editingPostId} onBack={handleBackToList} />
      )}
    </>
  );
}
