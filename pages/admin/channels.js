import { useState } from "react";
import {
  addChannelInfo,
  fetchTwitchChannels,
} from "../../src/external_apis/vodlink";
import PropTypes from "prop-types";
import styles from "../../styles/admin/channels.module.scss";
import { LOL_REGIONS } from "../../lol_data/constants";
import Link from "next/link";

function onChangeSetter(setState) {
  return (e) => {
    setState(e.target.value);
  };
}

function onChangeArraySetter(setState, index) {
  return (e) => {
    setState((prevState) => {
      const newStateArray = [...prevState];
      const newStateObject = {
        ...newStateArray[index],
        [e.target.name]: e.target.value,
      };
      newStateArray.splice(index, 1, newStateObject);
      return newStateArray;
    });
  };
}

function removeIndexFromArrayState(setState, index) {
  return () => {
    setState((prevState) => {
      const newStateArray = [...prevState];
      newStateArray.splice(index, 1);

      return newStateArray;
    });
  };
}

const emptySummoner = {
  name: "",
  region: "NA1",
};

function addSummonerRow(setState) {
  return () => {
    setState((prevState) => {
      return [...prevState, { ...emptySummoner }];
    });
  };
}

function Channels({ channels }) {
  const [channelName, setChannelName] = useState("");
  const [summoners, setSummoners] = useState([{ ...emptySummoner }]);

  const body = { twitchName: channelName, lolAccounts: summoners };
  const postChannelData = () => {
    addChannelInfo(body)
      .then((res) => {
        console.log(res.data);
        setChannelName("");
        setSummoners([emptySummoner]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h1>Channels</h1>
      <hr />
      <div>
        <label>
          Channel Name
          <input
            value={channelName}
            onChange={onChangeSetter(setChannelName)}
          />
        </label>

        {summoners.map((summoner, index) => {
          return (
            <div key={index}>
              <label>Name</label>
              <input
                value={summoner.name}
                name={"name"}
                onChange={onChangeArraySetter(setSummoners, index)}
              />

              <label>
                Region
                <select
                  name="region"
                  value={summoner.region}
                  onChange={onChangeArraySetter(setSummoners, index)}
                >
                  {LOL_REGIONS.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </label>
              {index === summoners.length - 1 && (
                <button onClick={addSummonerRow(setSummoners)}>+</button>
              )}
              {summoners.length > 1 && (
                <button
                  onClick={removeIndexFromArrayState(setSummoners, index)}
                >
                  -
                </button>
              )}
            </div>
          );
        })}
        <button onClick={postChannelData}>Submit</button>
      </div>
      <hr />
      <div className={styles.container}>
        {channels?.map((channel) => (
          <div key={channel.id} className={styles.channelContainer}>
            <Link href={`https://www.twitch.tv/${channel.login}`}>
              <a target="_blank">
                <h3>{channel.channelName}</h3>
              </a>
            </Link>
            <div>
              {channel.summoners.map((summoner) => (
                <div key={summoner.id} className={styles.summonerContainer}>
                  <Link
                    href={`https://u.gg/lol/profile/${summoner.region}/${summoner.summonerName}/overview`}
                  >
                    <a target="_blank">
                      <p>
                        {summoner.region} | {summoner.summonerName}
                      </p>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div>
        <code>
          {JSON.stringify(
            channels?.map((channel) => {
              return {
                channel_name: channel.login,
                summoners: channel.summoners.map((summoner) => {
                  return {
                    name: summoner.summonerName,
                    region: summoner.region?.toUpperCase(),
                  };
                }),
              };
            }),
            null,
            4
          )}
        </code>
      </div>
    </div>
  );
}

Channels.propTypes = {
  channels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      channel_name: PropTypes.string,
      summoners: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          summoner_name: PropTypes.string,
          region: PropTypes.string,
        })
      ),
    })
  ),
};

export async function getStaticProps() {
  if (process.env.NODE_ENV !== "development") {
    return { notFound: true };
  }

  const props = {
    error: null,
    channels: null,
  };

  try {
    const res = await fetchTwitchChannels();
    props.channels = res.data;
  } catch (error) {
    props.error = error.message;
  }

  return {
    props,
    revalidate: 60,
  };
}

export default Channels;
