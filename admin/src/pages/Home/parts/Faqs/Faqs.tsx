import cls from './Faqs.module.scss';
import clsParent from '../../Home.module.scss';
import { FaqsProps } from './Faqs.props';
import cn from 'classnames';
import BlockHead from '../../../../components/BlockHead/BlockHead';
import {
	Accordion,
	AccordionItem,
	AccordionItemButton,
	AccordionItemHeading,
	AccordionItemPanel
} from 'react-accessible-accordion';
import { FaqItemsPage } from '../../../../types/page';
import { FadeInWhenVisible } from '../../../../components';

const getCorrectList = (list: FaqItemsPage[]): FaqItemsPage[][] => {
	const res: FaqItemsPage[][] = [[], []];
	list.forEach((item, index) => {
		if (index % 2 == 0) {
			res[0].push(item);
		} else {
			res[1].push(item);
		}
	});
	return res;
};

export const Faqs = ({data, lang}: FaqsProps): JSX.Element => {
	if (!data) return <></>;

	const list: FaqItemsPage[][] = getCorrectList(data.items);

	return (
		<section className={cn(clsParent.title, cls.wrapper)}>
			<div className="container">
				<FadeInWhenVisible>
					<BlockHead className={cls.title}>
						{data.title[lang]}
					</BlockHead>
				</FadeInWhenVisible>
				<Accordion allowZeroExpanded className={cls.body}>
					<div className={cls.list}>
						{
							list[0].map(faq => {
								return (
									<FadeInWhenVisible key={faq._id}>
										<AccordionItem className={cls.listItem}>
											<AccordionItemHeading className={cls.listHeading}>
												<AccordionItemButton className={cls.listButton}>
													<span>{faq.title?.[lang]}</span>
													<span className={cn(cls.plus, 'plus')}/>
												</AccordionItemButton>
											</AccordionItemHeading>
											<AccordionItemPanel className={cls.listBody}>
												{faq.text?.[lang]}
											</AccordionItemPanel>
										</AccordionItem>
									</FadeInWhenVisible>
								);
							})
						}
					</div>
					<div className={cls.list}>
						{
							list[1].map(faq => {
								return (
									<FadeInWhenVisible key={faq._id}>
										<AccordionItem className={cls.listItem}>
											<AccordionItemHeading className={cls.listHeading}>
												<AccordionItemButton className={cls.listButton}>
													<span>{faq.title?.[lang]}</span>
													<span className={cn(cls.plus, 'plus')}/>
												</AccordionItemButton>
											</AccordionItemHeading>
											<AccordionItemPanel className={cls.listBody}>
												{faq.text?.[lang]}
											</AccordionItemPanel>
										</AccordionItem>
									</FadeInWhenVisible>
								);
							})
						}
					</div>
				</Accordion>
			</div>
		</section>
	);
};
