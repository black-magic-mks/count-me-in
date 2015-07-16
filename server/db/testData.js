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
    {
      username: 'shaan',
      password: 'Shaan1',
      following: []
    },
    {
      username: 'david',
      password: 'David1',
      following: []
    },
    {
      username: 'nathan',
      password: 'Nathan1',
      following: []
    },
    {
      username: 'realreal',
      password: 'Realreal1',
      following: []
    },
    {
      username: 'monica',
      password: 'Monica1',
      following: ['david']
    }
  ],

  pledges: [
    {
      pledgename: 'beactive',
      subscribers: ['mangle9','DaGoldberg', 'shaan', 'david', 'monica']
    },
    {
      pledgename: 'WriteFiction',
      subscribers: ['nathan', 'realreal', 'monica']
    },
    {
      pledgename: 'piano',
      subscribers: ['realreal', 'nathan', 'shaan', 'david', 'monica']
    },
    {
      pledgename: 'doPushUps',
      subscribers: ['mangle9', 'david', 'monica', 'shaan']
    }
  ],

  posts: [
    {
      pledgename: 'WriteFiction',
      title: 'Writing On BART',
      text: 'Wrote another chapter in my epic novel today while I was on BART. Made the trip go by so fast.',
      aws_url: 'https://s3.amazonaws.com/count-me-in-black-magic/undefined/1436833303607/real%20writing.jpg',
      username: 'realreal',
      likes: ['david', 'monica'],
      comments: [
        {
          text: 'The next JK Rowling! Good stuff',
          username: 'nathan'
        }
      ]
    },
    {
      pledgename: 'beactive',
      title: 'Hiking Outside of San Luis Obispo',
      text: 'What a conquering feeling and the best part is I get to show you all the view. Who wants to join me next time now that Im a local?',
      aws_url: 'https://s3.amazonaws.com/count-me-in-black-magic/undefined/1436834540536/woman-hiking1.jpg',
      username: 'monica',
      likes: ['david', 'realreal'],
      comments: [
        {
          text: 'sick view! where exactly is that in SLO?',
          username: 'realreal'
        }
      ]
    },
    {
      pledgename: 'doPushUps',
      title: 'Hiking Outside of San Luis Obispo',
      text: 'What a conquering feeling and the best part is I get to show you all the view. Who wants to join me next time now that Im a local?',
      aws_url: 'https://s3.amazonaws.com/count-me-in-black-magic/undefined/1436833956902/manpushupssfadfadfadfa.jpg',
      username: 'shaan',
      likes: ['david', 'monica'],
      comments: [
        {
          text: 'I cannot do 200. definitely be mindful of your elbow joints. mine broke',
          username: 'nathan'
        },
        {
          text: 'Great to see how much progress you have made in such a short period of time! You are definitely getting stronger and I can tell that the hard work is paying off. Keep it up!',
          username: 'david'
        }
      ]
    },
    {
      pledgename: 'beactive',
      title: 'Run In Golden Gate Park',
      text: 'Went for a 8 mile run in Golden Gate Park, when I reached the Pacific Ocean the views were amazing. Did you know it is the largest city park in the US?',
      aws_url: 'https://s3.amazonaws.com/count-me-in-black-magic/undefined/1436833712001/ManRunningInPark.jpg',
      username: 'david',
      likes: ['shaan', 'monica', 'nathan', 'realreal'],
      comments: [
        {
          text: 'Any chance you are around this weekend to run in golden gate park?',
          username: 'monica'
        },
        {
          text: 'What time do you usually run at?',
          username: 'nathan'
        }
      ]
    },
    {
      pledgename: 'WriteFiction',
      title: 'Chapter 4 of Fiction Novel',
      text: 'Just wrote the 4th chapter of my book and it took so long. Feels good to be done with and I am excited to move on to chapter 5.',
      aws_url: 'https://s3.amazonaws.com/count-me-in-black-magic/undefined/1436838210713/man-writing-books-600x400.jpg',
      username: 'realreal',
      likes: ['shaan'],
      comments: [
        {
          text: 'Excited to read it! keep me posted on the release date',
          username: 'nathan'
        },
        {
          text: 'Do you have any pointers for picking a topic to write a book about? Having trouble brainstorming',
          username: 'monica'
        }
      ]
    },
    {
      pledgename: 'piano',
      title: 'My First Piano Lesson',
      text: 'Never thought I would get so much satisfaction from taking a piano lesson. Thanks for the support everyone! Its taken my mind off of code.',
      aws_url: 'https://s3.amazonaws.com/count-me-in-black-magic/undefined/1436839017328/shaan%20piano.jpg',
      username: 'shaan',
      likes: ['realreal', 'david'],
      comments: [
        {
          text: 'for some reason lately I have not needed breaks from coding, but usually I do so I completely understand what you are talking about',
          username: 'nathan'
        },
        {
          text: 'great news, sometimes we all need a mental break from coding. especially knowing how hard you work',
          username: 'monica'
        }
      ]
    },
    {
      pledgename: 'doPushUps',
      title: '3 Sets of 10 Pushups',
      text: 'Focused on my form and kept my hands at shoulder width apart making sure to try to look straight ahead while I was going down. Did 30 (3 sets of 10 reps)',
      aws_url: 'https://s3.amazonaws.com/count-me-in-black-magic/undefined/1436832786026/Shaan%20pushups.jpg',
      username: 'shaan',
      likes: ['realreal'],
      comments: [
        {
          text: 'Widen that grip! Otherwise you could damage your elbow joints',
          username: 'realreal'
        }
      ]
    },
    {
      pledgename: 'piano',
      title: 'Recital Practice Day 2',
      text: 'The recital is coming quick and I want to make sure I am ready. This was day 2 of practice and I am feeling really good about it.',
      aws_url: 'https://s3.amazonaws.com/count-me-in-black-magic/undefined/1436833570458/more%20practice.jpg',
      username: 'david',
      likes: ['shaan', 'monica'],
      comments: [
        {
          text: 'The recital looks cool. where can I check it out? do I buy tickets in advance?',
          username: 'realreal'
        }
      ]
    },
    {
      pledgename: 'piano',
      title: 'Recital Practice Day 1',
      text: 'Practice for my recital coming up at City Hall. I really tried to focus and got away from memorizing the different notes.',
      aws_url: 'https://s3.amazonaws.com/count-me-in-black-magic/undefined/1436833466563/david%20focused%20piano.jpg',
      username: 'david',
      likes: ['monica'],
      comments: [
        {
          text: 'Yeah, you rock!',
          username: 'monica'
        }
      ]
    },
    {
      pledgename: 'beactive',
      title: 'Biking in Marin',
      text: 'The fields in Marin are beautiful. It felt so good to get out of the city and enjoy the countryside.',
      aws_url: 'https://s3.amazonaws.com/count-me-in-black-magic/undefined/1436834381949/biking.jpg',
      username: 'monica',
      likes: ['realreal', 'david'],
      comments: [
        {
          text: 'throw dem hands in the air',
          username: 'realreal'
        },
        {
          text: 'how far did you ride? looks like you have really earned it. By the way are those biking shoes pretty good? Jerod told me I should get a new pair cause mine smell terrible! let me know, thanks',
          username: 'david'
        }
      ]
    },
    {
      pledgename: 'beactive',
      title: 'Flys: 2 Sets of 12 Reps',
      text: 'Today I focused on building my chest strength and did some flys. The most difficult part was that I was maxing out the weight.',
      aws_url: 'https://s3.amazonaws.com/count-me-in-black-magic/undefined/1436833171998/nathan-gym.jpg',
      username: 'nathan',
      likes: ['DaGoldberg', 'therealréal', 'shahshaank'],
      comments: [
        {
          text: 'Careful not to over-extend your shoulders, could tear the rotator cuff. Thats what happened to me doing the same lift',
          username: 'david'
        }
      ]
    },
    {
      pledgename: 'piano',
      title: 'Dream Spot for Piano',
      text: 'Today I played piano in my dream spot overlooking the ocean. Not sure what was better...the view or my tunes.',
      aws_url: 'https://s3.amazonaws.com/count-me-in-black-magic/undefined/1436832929166/David%20piano.jpg',
      username: 'david',
      likes: ['DaGoldberg', 'shahshaank']
    }
  ]
};
