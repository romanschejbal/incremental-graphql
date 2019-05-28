%bs.raw
{| let exports = module.exports; |};
let s = ReasonReact.string;

module Fragment = [%graphql
  {|
    fragment CommentFragment on Comment {
        id
        text
        by
        time
        hello
    }
    |}
];

[@genType]
let fragment = Fragment.CommentFragment.query;

let (|?>) = (value, def) =>
  switch (value) {
  | None => def
  | Some(v) => v
  };

[@react.component]
let make = (~comment: Fragment.CommentFragment.MT_Ret.t) =>
  <div>
    <h3> comment##by->s </h3>
    <span>
      comment##time
      ->float_of_int
      ->Js.Date.fromFloat
      ->Js.Date.toLocaleDateString
      ->s
      " "->s
      comment##time
      ->float_of_int
      ->Js.Date.fromFloat
      ->Js.Date.toLocaleTimeString
      ->s
    </span>
    <p dangerouslySetInnerHTML={"__html": comment##text |?> "No content"} />
  </div>;

[@genType]
let default = make;