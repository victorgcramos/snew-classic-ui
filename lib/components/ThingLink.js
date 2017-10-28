import React from "react";
import ExpandoComponent from "./Expando";
import LinkComponent from "./Link";
import { optional } from "../util";

const ThingLink = ({
  Link=LinkComponent,
  Expando=ExpandoComponent,
  Timestamp = ({ created }) => created,
  id,
  expanded = false,
  name,
  author,
  domain,
  over_18,
  rank,
  stickied,
  score,
  downs,
  ups,
  num_comments,
  subreddit,
  subreddit_id,
  title,
  url,
  is_self,
  created,
  created_utc,
  selftext,
  selftext_html,
  permalink,
  thumbnail,
  preview,
  secure_media_embed,
  banned_by
}) => (
  <div
    className={`thing id-${id} odd link ${stickied ? "stickied" : ""} ${banned_by ? "spam" : ""} ${is_self ? "self" : ""}`}
    data-author={author}
    data-author-fullname=""
    data-domain={domain}
    data-fullname={name}
    data-rank={rank}
    data-subreddit={subreddit}
    data-subreddit-fullname={subreddit_id}
    data-timestamp={created_utc}
    data-type="link"
    data-url={url}
    id={`thing_${name}`}
  >
    <p className="parent" />
    <span className="rank">{rank}</span>
    <div className="midcol unvoted">
      <div
        aria-label="upvote"
        className="arrow up login-required access-required"
        data-event-action="upvote"
        role="button"
        tabIndex={0}
      />
      <div className="score dislikes">{downs > 10000 ? (downs/1000.0).toFixed(1)+"k" : downs}</div>
      <div className="score unvoted">{score  > 10000 ? (score/1000.0).toFixed(1)+"k" : score}</div>
      <div className="score likes">{ups > 10000 ? (ups/1000.0).toFixed(1)+"k" : ups}</div>
      <div
        aria-label="downvote"
        className="arrow down login-required access-required"
        data-event-action="downvote"
        role="button"
        tabIndex={0}
      />
    </div>
    {(thumbnail && !["image", "default", "nsfw", "self"].find((sub => sub === thumbnail))) ? (
      <Link
        className="thumbnail may-blank loggedin"
        href={url}
      >
        <img
          alt="Thumb"
          height={70}
          src={thumbnail}
          width={70}
        />
      </Link>
    ) : null}
    {thumbnail === "self" ? <Link className="thumbnail may-blank loggedin self" /> : null}
    <div className="entry unvoted">
      <p className="title">
        <Link
          className="title may-blank loggedin"
          href={url}
          tabIndex={rank}
        >{title}</Link>{" "}
        <span className="domain">
          (<Link href={`/domain/${domain}/`}>{domain}</Link>)
        </span>
      </p>
      {/*<div
        title="toggle"
        className={`expando-button ${expanded ? "expanded" : "collapsed"} selftext`}
      />*/}
      <p className="tagline">
        submitted <Timestamp {...{ created, created_utc }} /> by{" "}
        <Link
          className="author may-blank"
          href={`/user/${author}`}
        >{author}</Link>
        {" to "}
        <Link
          className="subreddit hover may-blank"
          href={`/r/${subreddit}`}
        >r/{subreddit}</Link>
      </p>
      {optional(Expando, { expanded, is_self, selftext, selftext_html })}
      <ul className="flat-list buttons">
        {over_18 ? (
          <li>
            <span className="nsfw-stamp stamp">
              <acronym title="Not Safe For Work">NSFW</acronym>
            </span>
          </li>
        ) : null}
        <li className="first">
          <Link
            className="bylink comments may-blank"
            data-event-action="comments"
            href={permalink}
            rel="nofollow"
          >{num_comments} comments</Link>
        </li>
        <li className="share">
          <a className="post-sharing-button">share</a>
        </li>
        <li className="link-save-button save-button">
          <a>save</a>
        </li>
        <li>
          <form className="state-button hide-button" >
            <input name="executed" type="hidden" defaultValue="hidden" />
            <span>
              <a data-event-action="hide" >hide</a>
            </span>
          </form>
        </li>
        <li className="report-button">
          <a className="action-thing reportbtn access-required" data-event-action="report" >
            report
          </a>
        </li>
      </ul>
      <div className="reportform" />
    </div>
    <div className="child" />
    <div className="clearleft" />
  </div>
);

export default ThingLink;