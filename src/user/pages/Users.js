import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Card from "../../shared/components/UIElements/Card";

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users"
        );

        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if ((!loadedUsers || loadedUsers.length === 0) && !error) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
          <h3>
            <Link to="/auth?mode=signup" style={{ color: "#ff0055" }}>
              Create new user
            </Link>
          </h3>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      {error && <ErrorModal error={error} onClear={clearError} />}

      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
