window.onload = async () => {
  // First add hooks for buttons
  let buttons = ["team", "mission", "sponsors"];

  for (let b of buttons) {
    document.getElementById(`${b}Button`).onclick = () => {
      window.location.href = `#${b}`;
    }
  }
  // Then try to load images for gallery
  let member_list;
  try {
    // Try to fetch member list
    let r = await fetch("./images/team/team_list.txt");
    if (r.status !== 200) throw new Error("File not found");
    member_list = (await r.text()).split("\n").filter(e => e !== "");

  } catch (e) {
    // If it fails, outputs something in its place
    console.log("ouch");
    let elem = document.getElementById("error_fetch");
    elem.innerText = "Unable to fetch member list";
    return;
  }

  for (let m of member_list) {
    try {
      // Create elements via Javascript
      let figure_elem = document.createElement("figure");
      let image_elem = document.createElement("img");
      let figcap_elem = document.createElement("figcaption");

      figure_elem.appendChild(image_elem);
      figure_elem.appendChild(figcap_elem);

      image_elem.src = `./images/team/${m}.png`;

      // Capitalize first letter of each part of name (bob_jones -> Bob Jones)
      let names = m.split("_");
      for (let i = 0; i < names.length; i++) {
        names[i] = names[i][0].toUpperCase() + names[i].substring(1);
      }
      figcap_elem.innerText = names.join(" ");

      // Put figure element into image gallery
      document.querySelector("section .image-gallery").appendChild(figure_elem);
    } catch(e) {
      console.log(e);
      continue;
    }
  }
}
