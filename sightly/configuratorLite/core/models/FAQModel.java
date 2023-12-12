package com.miniusa.core.models.sling.components.faq;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import com.miniusa.core.utils.MINIUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FAQModel {

    @Inject
    private String center;

    @Inject
    private String border;

    @Inject
    @Default(values = "#fff")
    private String bgColor;

    @ChildResource(name="options")
    List<FAQOptionsModel> faqList;

    public String getCenter() {
        return center;
    }

    public String getBorder() {
        return border;
    }

    public String getBgColor() {
        return bgColor;
    }

    public List<FAQOptionsModel> getFaqList() {
        return faqList;
    }
}
