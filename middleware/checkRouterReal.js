export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (Object.keys(store.state.users.user).length === 0) {
    return redirect('/user/real')
  }
}
