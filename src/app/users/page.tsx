export default function userDashboard() {
    return (
        <div>
            <h1>Manage Users</h1>
            <button>Create User</button>
            <section aria-labelledby="userList">
                <h2 id="userList"></h2>
                <ul>
                    <li>user1</li>
                    <li>user2</li>
                    <li>user3</li>
                </ul>
            </section>
            <section aria-labelledby="filters">
                <h2 id="filters"></h2>
            </section>
        </div>
    );
}