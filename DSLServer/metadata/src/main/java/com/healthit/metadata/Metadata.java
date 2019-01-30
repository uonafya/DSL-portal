/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.healthit.metadata;

import com.healthit.metadata.model.RequestEntity;
import java.util.List;

/**
 *
 * @author duncan
 */
public interface Metadata {
    public List<Object> getMetadata(RequestEntity requestString);
}
