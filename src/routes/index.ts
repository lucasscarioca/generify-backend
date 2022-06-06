import Router from 'express';
import usersRouter from './users.routes';
import songsRouter from './songs.routes';
import playlistsRouter from './playlists.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/songs', songsRouter);
router.use('/playlists', playlistsRouter);

export default router;