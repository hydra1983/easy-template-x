import * as fs from 'fs';
import { Tag } from 'src/compilation/tag';
import { LoopPlugin } from 'src/plugins';
import { XmlParser } from 'src/xmlParser';

describe(nameof(LoopPlugin), () => {

    it('creates a correct clone of the relevant nodes', () => {

        const loop = new LoopPlugin();

        const template: string = fs.readFileSync("./test/res/plugins/loop plugin.xml", { encoding: 'utf8' });
        const document = new XmlParser().parse(template);
        const tags = [
            new Tag({
                xmlNode: document.documentElement
                    .childNodes.item(1) // body
                    .childNodes.item(1) // paragraph
                    .childNodes.item(5) // run
                    .childNodes.item(3) // text node
            }),
            new Tag({
                xmlNode: document.documentElement
                    .childNodes.item(1) // body
                    .childNodes.item(3) // paragraph
                    .childNodes.item(7) // run
                    .childNodes.item(3) // text node
            })
        ];

        loop.containerTagReplacements(document, 0, 1, tags, {});
    });

});