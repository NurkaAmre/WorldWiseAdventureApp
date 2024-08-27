import styles from './CityItem.module.css'
import { Link } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));


export default function CityItem({ city }) {
  const {currentCity, deleteCity} = useCities()
  const { cityName, emoji, date, id, position } = city

  function handleClick(e) { 
    e.preventDefault()
    deleteCity(id)
  }

  return (
    <li>
  <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`} className={`${styles.cityItem} ${id===currentCity.id ? styles['cityItem--active'] : ''}`}>
        <Link ></Link>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
        <button
          onClick={handleClick}
          className={styles.deleteBtn}>
        &times;
        </button>
      </Link>
   </li>
  )
}
