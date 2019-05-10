import express from 'express';
import fetch from 'isomorphic-fetch';
import fs from 'fs';

const app = express();

const items: Story[] = JSON.parse(fs.readFileSync('./items.json', 'utf8'));

type Story = {
  id: string;
  type: string;
  kids: Story[];
};

async function fetchItem(id: any): Promise<Story> {
  return await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  ).then(res => res.json());
}

(async function() {
  const itemsToFetch = await fetch(
    'https://hacker-news.firebaseio.com/v0/topstories.json'
  ).then(res => res.json());

  const items: Story[] = [];

  process.on('SIGINT', () => {
    console.log('Ctrl-C...');
    fs.writeFileSync('./items.json', JSON.stringify(items));
    process.exit(2);
  });

  let max = 1;
  setInterval(() => {
    const number = parseInt(fs.readFileSync('./max', 'utf8'));
    if (Number.isNaN(number)) max = 1;
    else max = number;
    console.log('Running jobs:', running);
  }, 30000);

  let running = 0;
  let previousFailed = 0;
  while (itemsToFetch.length || running) {
    if (running < max) {
      running++;
      const id = itemsToFetch.shift();
      console.log(
        'Fetching item',
        items.length + 1,
        '/',
        itemsToFetch.length,
        'of id',
        id
      );
      fetchItem(id)
        .then(item => {
          previousFailed = 0;
          (item.kids || []).forEach(kidId => itemsToFetch.push(kidId));
          items.push(item);
          running--;
        })
        .catch(async e => {
          console.log('Fetch of item', id, 'failed', e);
          itemsToFetch.push(id);
          previousFailed = previousFailed ? previousFailed * 2 : 1;
          console.log('Waiting for', previousFailed, 'seconds...');
          await new Promise(resolve =>
            setTimeout(resolve, previousFailed * 1000)
          );
          running--;
        });
    } else if (itemsToFetch.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  fs.writeFileSync('./items.json', JSON.stringify(items));
});

app.get('/item/:storyId', (req, res) => {
  const item = items.find(story => story && story.id == req.params.storyId);
  if (!item) {
    return res
      .status(404)
      .json({ message: `Item ${req.params.storyId} not found` });
  }
  res.json(item);
});

app.get('/top-stories', (req, res) => {
  const { offset = 0, limit = 20 } = req.query;
  res.json(
    items
      .filter(story => story && story.type === 'story')
      .slice(parseInt(offset), parseInt(limit) + parseInt(offset))
      .map(story => story.id)
  );
});

app.listen(3001, () => {
  console.log('Ready on http://localhost:3001/');
});
