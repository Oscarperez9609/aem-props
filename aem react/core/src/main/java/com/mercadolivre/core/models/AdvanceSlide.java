package com.mercadolivre.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AdvanceSlide {

    public AdvanceSlide(){}

    @ValueMapValue
    private String mainText;

    @ValueMapValue
    private String secondaryText;

    @ValueMapValue
    private String backgroundDesktop;

    @ValueMapValue
    private String backgroundMobile;

    @ValueMapValue
    private String resourcePath;

    @ValueMapValue
    private Boolean isVideo;

    @ChildResource(name= "buttons", injectionStrategy = InjectionStrategy.OPTIONAL)
    private List<Button> buttons;

    public String getMainText() {
        return mainText;
    }

    public String getSecondaryText() {
        return secondaryText;
    }

    public String getBackgroundDesktop() {
        return backgroundDesktop;
    }

    public String getBackgroundMobile() {
        return backgroundMobile;
    }

    public String getResourcePath() {
        return resourcePath;
    }

    public Boolean getVideo() {
        return isVideo;
    }

    public List<Button> getButtons() {
        return buttons;
    }
}
