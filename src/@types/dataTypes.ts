export interface PessoasType {
	name: string;
	key: string;
	height: string;
	hair_color: string;
	skin_color: string;
	eye_color: string;
	mass: string;
	birth_year: string;
	gender: string;
	url: string;
	characters: string[];
}

export interface FilmsType {
	key: string;
	title: string;
	episode_id: number;
	opening_crawl: string;
	director: string;
	producer: string;
	release_date: string;
	characters: string[];
	planets: string[];
	starships: string[];
	vehicles: string[];
	species: string[];
	created: string;
	edited: string;
	url: string;
}
