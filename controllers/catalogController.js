const db = require('../config/db');

const normalizePosterUrl = (posterUrl) => {
    if (!posterUrl || typeof posterUrl !== 'string') {
        return '/images/no-poster.svg';
    }

    const trimmed = posterUrl.trim();
    if (!trimmed) {
        return '/images/no-poster.svg';
    }

    if (trimmed.startsWith('/')) {
        return trimmed;
    }

    if (trimmed.startsWith('data:image/')) {
        return trimmed;
    }

    if (/^https?:\/\//i.test(trimmed)) {
        return trimmed;
    }

    if (trimmed.startsWith('uploads/') || trimmed.startsWith('images/')) {
        return `/${trimmed}`;
    }

    return `/${trimmed.replace(/^\.\//, '').replace(/^\//, '')}`;
};

exports.index = async (req, res, next) => {
    try {
        const sql = `
            SELECT id, title, slug, synopsis, genre, year, poster_url, status
            FROM anime
            ORDER BY created_at DESC, id DESC
        `;

        const [animeList] = await db.query(sql);
        const normalizedAnimeList = animeList.map((anime) => ({
            ...anime,
            poster_url: normalizePosterUrl(anime.poster_url)
        }));

        res.render('catalog/index', {
            title: 'Daftar Anime',
            animeList: normalizedAnimeList
        });
    } catch (error) {
        next(error);
    }
};