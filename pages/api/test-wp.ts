import { getAllNews, getAllNotices, getAllEvents, getAllProjects } from '@/lib/wordpress';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('Fetching news...');
    const news = await getAllNews();
    console.log('News:', Array.isArray(news) ? 'Array' : typeof news);

    console.log('Fetching notices...');
    const notices = await getAllNotices();
    console.log('Notices:', Array.isArray(notices) ? 'Array' : typeof notices);

    console.log('Fetching events...');
    const events = await getAllEvents();
    console.log('Events:', Array.isArray(events) ? 'Array' : typeof events);

    console.log('Fetching projects...');
    const projects = await getAllProjects();
    console.log('Projects:', Array.isArray(projects) ? 'Array' : typeof projects);

    res.status(200).json({ success: true, newsCount: news.length });
  } catch (error: any) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}
