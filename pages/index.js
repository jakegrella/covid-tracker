import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import axios from 'axios';

export default function Home() {
	const [data, setData] = useState({});
	const [code, setCode] = useState('');

	const handleChange = (event) => {
		setCode(event.target.value);
	};
	console.log('code', code);

	const handleSubmit = function (event) {
		event.preventDefault();

		axios
			.get(`https://corona-api.com/countries/${code}`)
			.then((res) => {
				console.log(res);
				setData(res.data.data);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Covid-19 Tracker</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Covid-19 Tracker</h1>

				<p className={styles.description}>
					Type desired country's ISO 3166-1 aplha-2 code
				</p>
				<a
					href='https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements'
					target='_blank'
					rel='noopener noreferrer'
				>
					(Click here for a list of acceptable codes)
				</a>

				<section>
					<form onSubmit={handleSubmit}>
						<input
							type='text'
							name='code'
							value={code}
							onChange={handleChange}
						/>
						<button>submit</button>
					</form>
				</section>
				<section>
					{console.log(data)}
					{console.log(Object.keys(data).length)}
					{Object.keys(data).length > 0 ? (
						<>
							<h3>{data.name}</h3>
							<p>Deaths: {data.latest_data.deaths}</p>
							<p>Confirmed Cases: {data.latest_data.confirmed}</p>
						</>
					) : (
						<p></p>
					)}
				</section>
			</main>

			<footer className={styles.footer}>
				<a
					href='https://jakegrella.com'
					target='_blank'
					rel='noopener noreferrer'
				>
					Created by Jake Grella using corona-api.com
				</a>
			</footer>
		</div>
	);
}
