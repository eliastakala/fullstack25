import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../requests';

const User = () => {
  const { id } = useParams()
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  if (isLoading) return <div>loading...</div>

  const user = users.find(u => u.id === id)
  if (!user) return null

  return (
    <div className="user">
      <h1>{user.name}</h1>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
            <li key={blog.id}>
                {blog.title}
            </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
