import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchPosts, createPost, updatePost, deletePost } from './api';

function App() {
  const queryClient = useQueryClient();
  const [newPostTitle, setNewPostTitle] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  const { data: posts, isLoading, error } = useQuery('posts', fetchPosts);

  const createPostMutation = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
  });

  const updatePostMutation = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      setEditingPost(null);
    },
  });

  const deletePostMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  const handleCreatePost = () => {
    createPostMutation.mutate({ title: newPostTitle });
    setNewPostTitle('');
  };

  const handleUpdatePost = () => {
    updatePostMutation.mutate({ id: editingPost.id, updatedPost: { title: editingTitle } });
  };

  return (
    <div className="App">
      <h1>CRUD App</h1>

      <div>
        <input
          type="text"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
          placeholder="New Post Title"
        />
        <button onClick={handleCreatePost}>Create</button>
      </div>

      {posts.map((post) => (
        <div className="post" key={post.id}>
          {editingPost?.id === post.id ? (
            <>
              <input
                type="text"
                className="edit-input"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
              />
              <button onClick={handleUpdatePost}>Update</button>
            </>
          ) : (
            <>
              <p>{post.title}</p>
              <button onClick={() => {
                setEditingPost(post);
                setEditingTitle(post.title);
              }}>
                Edit
              </button>
              <button onClick={() => deletePostMutation.mutate(post.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
