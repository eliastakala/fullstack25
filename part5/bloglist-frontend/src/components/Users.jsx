import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getUsers } from "../requests";
import { Link } from 'react-router-dom'

const Users = () => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  const users = result.data;

  console.log("users", users);
  console.log("users blogs", users[0].blogs);

  return (
    <div>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td> {user.blogs.length} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
