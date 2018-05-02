import React from 'react';
import { config } from '../../config';

function Content() {
  const c = config;
  const classifyPath = `${c.host}projects/${c.projectSlug}/classify?workflow=`;

  return (
    <div>
      <span>
        The Cairo Geniza contains over 300,000 fragments of paper and parchment.
        Up until the late 19th century, these fragments were housed in the attic of
        the Ben Ezra Synagogue, located in old Cairo. A Geniza is a temporary storage
        chamber for worn documents and books that contain Hebrew characters, considered
        sacred in Jewish tradition. Due to the sacred nature of religious texts with
        Hebrew characters, they cannot be haphazardly thrown away; rather, they are
        placed in a temporary storage space, a Geniza, and then they are buried in a
        cemetery. However, for unknown reasons the Jews of Cairo never buried the
        majority of their worn manuscripts. Their uncustomary practices are also found
        in the content of the manuscripts themselves. They are both of a religious
        genre and an everyday nature; Prayer books and marriage contracts are
        intermingled with court petitions and shopping lists. Dating mostly from
        the 10th-13th centuries CE, the documents from the Cairo Geniza are widely
        recognized as the most important documentary source for reconstructing the
        social, economic, political, literary, and religious lives of Jews and the
        other inhabitants of the premodern Mediterranean basin.
      </span>
      <span>
        In this project we are asking volunteers to transcribe fragments from The
        Cairo Geniza. In a <a href={`${classifyPath}${c.phaseOne}`} target="_blank">first phase of this project</a>, these fragments are sorted
        for the purpose of easing the process of transcription. Transcription of
        these fragments is vitally important for research and more broadly, because
        they have the potential to rewrite the history of the premodern Middle East,
        Mediterranean and Indian Ocean trade, and the Jewish diaspora. Virtually all
        scholars who have studied these texts have come away with a transformed sense
        of the history of the region and the long ties of intimacy among its people.
      </span>
    </div>
  );
};

export default Content;
