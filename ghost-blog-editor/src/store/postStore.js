import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const usePostStore = create(
  persist(
    (set) => ({
      posts: [],
      
addPost: (postData) => {
  const newPost = {
    id: Date.now().toString(),
    title: postData.title || '',  // ← Empty string, not "Post Title"
    content: postData.content || '',
    featuredImage: postData.featuredImage || '',
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: null,
  };
  set((state) => ({ posts: [newPost, ...state.posts] }));
  return newPost;
},


      
      updatePost: (id, updates) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id ? { ...post, ...updates } : post
          ),
        })),
      
      publishPost: (id) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id 
              ? { ...post, status: "published", publishedAt: new Date().toISOString() } 
              : post
          ),
        })),
      
      deletePost: (id) =>
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
        })),
    }),
    {
      name: 'ghost-blog-posts', // name of the item in localStorage (must be unique)
      storage: createJSONStorage(() => localStorage), // use localStorage
    }
  )
);

