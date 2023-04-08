import { Component, For, createResource, createSignal } from "solid-js";
import Fetcher from "./Fetcher";

async function getNames(): Promise<Array<User>> {
  const data = await Fetcher.get("/user/all");
  const allUsers: Array<User> = data;

  return allUsers;
}

const App: Component = () => {
  const [data, { refetch }] = createResource(getNames);
  const [name, setName] = createSignal("");
  const [updatedName, setUpdatedName] = createSignal("");

  async function addUser() {
    await Fetcher.post(
      "/user",
      {},
      {
        name: name(),
        password: "blahblah",
      }
    );

    setName("");
    refetch();
  }

  async function onDeleteUser(id: number) {
    await Fetcher.post(`/user/${id}/delete`);
    refetch();
  }

  async function onUpdateUser(id: number) {
    await Fetcher.post(
      `/user/${id}/update`,
      {},
      {
        name: updatedName(),
      }
    );

    setUpdatedName("");
    refetch();
  }

  return (
    <div>
      <p class="text-5xl">Display all the names!</p>
      <h3>Loading: {JSON.stringify(data.loading)}</h3>
      <h3>Add a name:</h3>
      <input
        type="text"
        value={name()}
        onInput={(e) => setName(e.target.value)}
      />
      <p>{name()}</p>
      <button onClick={addUser}>Add</button>
      <h3>All Names:</h3>
      <ul>
        <For each={data()}>
          {(user) => (
            <>
              <li>
                <span>{user.name}</span>{" "}
                <span onClick={() => onDeleteUser(user.id)}>X</span>
                <button onClick={() => onUpdateUser(user.id)}>Update</button>
              </li>
            </>
          )}
        </For>
      </ul>
      <h3>Update Name:</h3>
      <input
        type="text"
        value={updatedName()}
        onInput={(e) => setUpdatedName(e.target.value)}
      />
    </div>
  );
};

export default App;
