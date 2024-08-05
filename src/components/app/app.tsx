import { CSSProperties, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import styles from '../../styles/index.module.scss';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';

export const App = () => {
	const [style, setStyle] = useState<ArticleStateType>(defaultArticleState); // тут вы написали замечание по семантике, но я его не очень понял, если есть возможность, то помогите пожайлуйста
	return (
		<div
			className={styles.main}
			style={
				{
					'--font-family': style.fontFamilyOption.value,
					'--font-size': style.fontSizeOption.value,
					'--font-color': style.fontColor.value,
					'--container-width': style.contentWidth.value,
					'--bg-color': style.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setStyle={setStyle} />
			<Article />
		</div>
	);
};
