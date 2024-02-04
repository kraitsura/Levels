import { Data, StatInfo } from '@shared/models'

export const statsMock: StatInfo[] = [
  {
    title: `Intellect`,
    lastEditTime: new Date().getTime(),
    exp: 0,
    level: 0
  },
  {
    title: 'Strength',
    lastEditTime: new Date().getTime(),
    exp: 0,
    level: 0
  },
  {
    title: 'Luck',
    lastEditTime: new Date().getTime(),
    exp: 0,
    level: 0
  },
  {
    title: 'Agility',
    lastEditTime: new Date().getTime(),
    exp: 0,
    level: 0
  }
]

export const defaultData: Data = {
  stats: [
    {
      title: 'Strength',
      lastEditTime: Date.now(),
      exp: 0,
      level: 1
    },
    {
      title: 'Agility',
      lastEditTime: Date.now(),
      exp: 0,
      level: 1
    },
    {
      title: 'Intellect',
      lastEditTime: Date.now(),
      exp: 0,
      level: 1
    },
    {
      title: 'Health',
      lastEditTime: Date.now(),
      exp: 0,
      level: 1
    }
  ],
  quests: [
    {
      title: 'Go To the gym',
      lastEditTime: Date.now(),
      progress: 0,
      status: false,
      rewards: []
    },
    {
      title: 'Run a Marathon',
      lastEditTime: Date.now(),
      progress: 0,
      status: false,
      rewards: []
    },
    {
      title: 'Read Books',
      lastEditTime: Date.now(),
      progress: 0,
      status: false,
      rewards: []
    },
    {
      title: 'Eat Healty',
      lastEditTime: Date.now(),
      progress: 0,
      status: false,
      rewards: []
    }
  ]
}
