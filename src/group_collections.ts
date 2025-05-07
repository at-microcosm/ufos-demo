function filtering(cs: any, filter: string) {
  if (!filter) return cs;
  let out: any = {};
  Object.keys(cs).forEach(nsid => {
    if (nsid.includes(filter)) {
      out[nsid] = cs[nsid];
    }
  });
  return out;
}

function adapt_new_api(bleh: any) {
  // this will lose inner leaves. oh well for now.
  const by_nsid: any = {};
  const f = (path: string[], o: any) => {
    console.log(path, o);
    let child_segments = Object.keys(o.nsid_child_segments);
    if (child_segments.length === 0) {
      console.log('o', o);
      by_nsid[path.join('.')] = o.total_records;
    } else {
      child_segments.forEach(segment =>
        f([...path, segment], o.nsid_child_segments[segment]));
    }
  };
  f([], bleh);
  return by_nsid;
}

function to_top_groups(cs: any) {
  const grouped: any = {};
  Object.keys(cs).forEach(nsid => {
    const n = cs[nsid];
    const parts = nsid.split('.');
    const group = parts.slice(0, 2).join('.');
    const thing = parts.slice(2).join('.');
    if (!grouped[group]) {
      grouped[group] = {
        n: 0,
        things: [],
      }
    }
    const grouped_group = grouped[group];
    grouped_group.n += n;
    grouped_group.things.push({
      thing,
      n
    });
  });

  let groups = Object.keys(grouped).map(group => {
    let grouped_group = grouped[group];
    grouped_group.things.sort((a: any, b: any) => b.n - a.n);
    return { group, ...grouped_group };
  });
  groups.sort((a, b) => b.n - a.n)

  return groups;
}

export { adapt_new_api, to_top_groups, filtering }
