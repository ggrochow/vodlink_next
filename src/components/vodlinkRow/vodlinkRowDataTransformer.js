function vodlinkRowDataTransformer(rawVodlink) {
  return {
    id: rawVodlink.id,
    nativeMatchId: rawVodlink.native_match_id,
    winningTeam: rawVodlink.winning_team,
    matchStartDate: rawVodlink.started_at,
    region: rawVodlink.region,
    participants: rawVodlink.participants.map((participant) => {
      const transformedParticipant = {
        id: participant.id,
        teamId: participant.team_id,
        championId: participant.champion_id,
        role: participant.role,
        summonerName: participant.summoner_name,
        runes: [
          participant.rune_1,
          participant.rune_2,
          participant.rune_3,
          participant.rune_4,
          participant.rune_5,
          participant.rune_6,
        ],
        rank: {
          tier: participant.rank_tier,
          rank: participant.rank_rank,
          lp: participant.rank_lp,
        },
        mastery: {
          level: participant.mastery_level,
          points: participant.mastery_points,
        },
      };

      if (participant.vod && participant.vodLink) {
        transformedParticipant.vod = {
          nativeVodId: participant.vod.native_vod_id,
          offset: participant.vodLink.vod_timestamp,
        };
      }

      if (participant.channel) {
        transformedParticipant.channel = {
          channelName: participant.channel.channel_name,
          displayName: participant.channel.display_name,
        };
      }

      return transformedParticipant;
    }),
  };
}

export default vodlinkRowDataTransformer;
