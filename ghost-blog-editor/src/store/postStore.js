import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePostStore = create(
  persist(
    (set) => ({
      posts: [],
      
      addPost: (post) =>
        set((state) => ({
          posts: [
            ...state.posts,
            {
              ...post,
              id: Date.now(),
              createdAt: new Date().toISOString(),
              status: 'draft',
            },
          ],
        })),

      updatePost: (id, updates) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id ? { ...post, ...updates, updatedAt: new Date().toISOString() } : post
          ),
        })),

      deletePost: (id) =>
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
        })),

      publishPost: (id) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id
              ? { ...post, status: 'published', publishedAt: new Date().toISOString() }
              : post
          ),
        })),
    }),
    {
      name: 'ghost-posts-storage',
    }
  )
);
