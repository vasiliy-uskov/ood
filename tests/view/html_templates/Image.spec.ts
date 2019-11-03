import {Image} from "../../../src/view/html_templates/Image";
import {Size} from "../../../src/utils/Size";

function expandImage(src: string, size: Size) {
	expect(Image({src, size})).toMatchSnapshot();
}

it('expand image', () => {
	expandImage('./location/img.png', {
		width: 100,
		height: 100,
	});
});