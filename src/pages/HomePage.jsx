import PageNav from "../components/PageNav"
import { NavLink } from "react-router-dom"
export default function HomePage() {
  return (
    <div>
      <PageNav />
      <h1> World Wise</h1>
      <NavLink to="/app">Go to the App</NavLink>
    </div>
  )
}
