module.exports = {
  users: [
    {
      username: 'shahshaank',
      password: 'Hello1',
      following: ['mangle9']
    },
    {
      username: 'mangle9',
      password: 'Hello1',
      following: ['shahshaank','therealréal','DaGoldberg','CTO_NLinksta']
    },
    {
      username: 'therealréal',
      password: 'Hello1',
      following: ['shahshaank','mangle9','DaGoldberg','CTO_NLinksta']
    },
    {
      username: 'DaGoldberg',
      password: 'Hello1',
      following: ['mangle9','therealréal','CTO_NLinksta']
    },
    {
      username: 'CTO_NLinksta',
      password: 'Hello1',
      following: ['DaGoldberg']
    },
  ],

  pledges: [
    {
      pledgename: 'beactive',
      subscribers: ['mangle9','DaGoldberg']
    },
    {
      pledgename: 'WriteFiction',
      subscribers: []
    },
    {
      pledgename: 'beaDOG',
      subscribers: ['therealréal','CTO_NLinksta']
    },
    {
      pledgename: 'doPushUps',
      subscribers: ['mangle9']
    },
    {
      pledgename: 'loseweight',
      subscribers: []
    },
    {
      pledgename: 'unicycling',
      subscribers: ['CTO_NLinksta','mangle9']
    }
  ],

  posts: [
    {
      pledgename: 'beactive',
      title: 'worked out',
      text: 'Push press, 5x6-1x12, 65-75-80x3-45\nDb bench press, 5x6, 40-45-50x3\nKettle bell Arnold press, 4x8, 12kg?\n Bosu ball push-ups, 4x10',
      aws_url: 'http://i.imgur.com/ZDA7HL8.png',
      username: 'mangle9',
      likes: ['DaGoldberg', 'therealréal', 'shahshaank', 'CTO_NLinksta'],
      comments: [
        {
          text: 'Awesome job working out! Love the dedication and it looks like you are already getting bigger. Keep it up!',
          username: 'DaGoldberg'
        },
        {
          text: 'Make sure to keep you back straight and tighten your abs. Other than that, great form',
          username: 'therealréal'
        },
        {
          text: 'Getting buff! Bro-grammers unite!',
          username: 'CTO_NLinksta'
        }
      ]
    },
    {
      pledgename: 'beactive',
      title: 'Ran',
      text: 'ran 8 miles, did 200 pushups, and random abs stuff',
      aws_url: 'https://i.imgur.com/VsypS7K.png',
      username: 'mangle9',
      likes: ['therealréal'],
      comments: [
        {
          text: 'Keep on runnin! Bring on the marathon',
          username: 'therealréal'
        }
      ]
    },
    {
      pledgename: 'beactive',
      title: 'Worked Out',
      text: 'Deadlift, 6x6. 155-165-175-185x3\nLat pull down, 4x8, 115\nSeated row, 4x8, 85-93x3\nBoxing',
      aws_url: 'https://i.imgur.com/L7SUjW5.png',
      username: 'DaGoldberg',
      likes: ['therealréal', 'CTO_NLinksta'],
      comments: [
        {
          text: 'You have definitely gotten stronger (even though I can still out lift you and am a better person than you',
          username: 'CTO_NLinksta'
        }
      ]
    },
    {
      pledgename: 'beactive',
      title: 'cardio',
      text: 'Cardio circuit, x3\nBox jumps\nJump rope\nBig tire toss\nBulgarian bag swing',
      aws_url: 'https://i.imgur.com/NLe9dXY.png',
      username: 'DaGoldberg',
      likes: ['shahshaank', 'CTO_NLinksta', 'mangle9'],
      comments: [
        {
          text: 'Cardio is so important. I am proud of you',
          username: 'shahshaank'
        }
      ]
    },
    {
      pledgename: 'beactive',
      title: 'squat day',
      text: 'Bench press, 3x6-2x5 with spot, 85-95-105-115x2\nPush press, 6x6, 55-65-75-80-85x2\nIncline db press, 4x8, 35x2-40x2\nArnold press, 4x8, 8kg kettle bell x2 - 20lb x2',
      aws_url: 'https://i.imgur.com/0l59mVc.jpg',
      username: 'DaGoldberg',
      likes: ['CTO_NLinksta', 'mangle9'],
      comments: [
        {
          text: 'Impressive, I wish I had such good squat form',
          username: 'mangle9'
        }
      ]
    },
    {
      pledgename: 'beactive',
      title: 'played soccer',
      text: 'played on the harvard campus!',
      aws_url: 'https://i.imgur.com/Acr6kBR.png',
      username: 'mangle9',
      likes: ['DaGoldberg', 'therealréal'],
      comments: [
        {
          text: 'When are the tryouts for team USA?',
          username: 'therealréal'
        },
        {
          text: 'The next Lionel Messi...',
          username: 'DaGoldberg'
        }
      ]
    },
    {
      pledgename: 'unicycling',
      title: '30 minutes',
      text: 'had a streak for 10 straight minutes',
      aws_url: 'https://i.imgur.com/h3A3K70.png',
      username: 'CTO_NLinksta',
      likes: ['therealréal'],
      comments: [
        {
          text: 'Showing skills, nice. Lets go road biking too',
          username: 'therealréal'
        }
      ]
    },
    {
      pledgename: 'unicycling',
      title: '20 minutes',
      text: 'had a streak for 11 straight minutes',
      aws_url: 'https://i.imgur.com/dxELaOj.png',
      username: 'CTO_NLinksta',
      likes: [],
    },
    {
      pledgename: 'unicycling',
      title: '13 minutes',
      text: 'had a streak for 20 straight minutes',
      aws_url: 'https://i.imgur.com/71PoHrz.png',
      username: 'mangle9',
      likes: ['DaGoldberg', 'therealréal'],
      comments: [
        {
          text: 'Why do you have to make us all look bad?',
          username: 'DaGoldberg'
        }
      ]
    },
    {
      pledgename: 'unicycling',
      title: '14 minutes',
      text: 'had a streak for 4 straight minutes',
      aws_url: 'https://i.imgur.com/8OEbCcb.png',
      username: 'mangle9',
      likes: ['therealréal'],
    },
    {
      pledgename: 'doPushUps',
      title: 'shoulder pushups',
      text: '3 sets of 40',
      aws_url: 'https://i.imgur.com/tVRtGDW.png',
      username: 'mangle9',
      likes: ['DaGoldberg', 'shahshaank'],
    },
    {
      pledgename: 'doPushUps',
      title: 'regular wide pushups',
      text: '',
      aws_url: 'https://i.imgur.com/RhwKpzO.png',
      username: 'mangle9',
      likes: ['therealréal'],
    },
    {
      pledgename: 'doPushUps',
      title: 'close grip push ups',
      text: '',
      aws_url: 'https://i.imgur.com/Xt7SKYh.png',
      username: 'mangle9',
      likes: ['DaGoldberg', 'therealréal', 'shahshaank'],
    },
    {
      pledgename: 'doPushUps',
      title: 'regular wide pushups',
      text: '10 sets of 80',
      aws_url: 'https://i.imgur.com/adzYGgI.png',
      username: 'mangle9',
      likes: ['DaGoldberg', 'shahshaank'],
    },
    {
      pledgename: 'doPushUps',
      title: 'close grip push ups',
      text: '2 sets of 10 wide, 3 sets of 20 close',
      aws_url: 'https://i.imgur.com/4WHBzt7.png',
      username: 'mangle9',
      likes: ['therealréal'],
      comments: [
        {
          text: 'Widen that grip! Otherwise you could damage your elbow joints',
          username: 'therealréal'
        }
      ]
    },
    {
      pledgename: 'beaDOG',
      title: 'code',
      text: 'Coded this website',
      aws_url: 'https://i.imgur.com/1pbtoVN.jpg',
      username: 'therealréal',
      likes: ['DaGoldberg', 'shahshaank'],
      comments: [
        {
          text: 'Your code looks beautfiul. These hiring partners should just hire you now',
          username: 'shahshaank'
        }
      ]
    },
    {
      pledgename: 'beaDOG',
      title: 'read a book',
      text: 'Read "To Bark at Mockingbird" by Barker Lee',
      aws_url: 'https://i.imgur.com/ZbCn10B.jpg',
      username: 'therealréal',
      likes: ['mangle9'],
    },
    {
      pledgename: 'beaDOG',
      title: 'wash a car',
      text: 'Washed by car',
      aws_url: 'https://i.imgur.com/3wIZshz.jpg',
      username: 'therealréal',
      likes: ['DaGoldberg', 'shahshaank', 'mangle9'],
      comments: [
        {
          text: 'Getting after it, good cleaning work',
          username: 'DaGoldberg'
        },
        {
          text: 'I think you missed a spot...',
          username: 'mangle9'
        },
        {
          text: '@mangle9 I think you are wrong, looks good to me',
          username: 'shahshaank'
        }
      ]
    },
    {
      pledgename: 'beaDOG',
      title: 'play poker',
      text: 'Won 20 dog biscuits!',
      aws_url: 'https://i.imgur.com/2BKi8j7.jpg',
      username: 'CTO_NLinksta',
      likes: ['therealréal', 'shahshaank', 'mangle9'],
      comments: [
        {
          text: 'Alligator blood!',
          username: 'therealréal'
        },
          {
          text: 'Lets go to vegas!',
          username: 'mangle9'
        }
      ]
    },
    {
      pledgename: 'beaDOG',
      title: 'be a lumberjack',
      text: 'I\'m a lumberjack',
      aws_url: 'https://i.imgur.com/11uRZ3T.jpg',
      username: 'CTO_NLinksta',
      likes: ['DaGoldberg'],
      comments: [
        {
          text: 'You are strong, must be strong, have to be strong to be a lumberjack. Except I feel bad for the trees',
          username: 'DaGoldberg'
        }
      ]
    }
  ]
};
